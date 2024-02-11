const KINDS = {
	8: {icon: '', title: 'Enumerations'},
	128: {icon: '', title: 'Classes'},
	256: {icon: '', title: 'Interfaces'},
	4194304: {icon: '', title: 'Type Aliases'},
	32: {icon: '', title: 'Variables'},
	64: {icon: '', title: 'Functions'},

	512: {icon: '', title: 'constructor'},
	1024: {icon: '', title: 'property'},
	2048: {icon: '', title: 'method'},
	262144: {icon: '', title: 'getter'},
};

const ID_MAP = {};
const GROUPS_MAP = {};
const ID_GROUP_MAP = {};
const GROUP_TYPES = {};
const ROOT_GROUPS = [];

(() => {
	console.debug('xutils - typedoc');

	// fetch data
	console.debug('[*] fetching data...');
	fetch_data().then((data) => {
		console.debug('[+] success:', {data});
		console.debug('[*] parsing data...');
		parse_item(data);
		console.debug('[+] parse complete.');
	})
	.catch(error => {
		console.warn('[-] failure:', error);
	});
})();

async function fetch_data(){
	// const url = 'xutils/typedocs.json';
	const url = './typedocs.json';
	return fetch(url)
	.then(response => {
		if (!response.ok) return Promise.reject('Network response was not ok');
		return response.json();
	});
}

function parse_item(item, parents=[]){
	const parent = Object(item);
	if (!(parent.hasOwnProperty('id') && Number.isInteger(parent.id))){
		console.error('[-] Invalid parse item.', {item});
		return;
	}
	//root = {id, name, variant, kind, flags, children, groups, packageName, readme, symbolIdMap}
	// +- {id, name, variant, kind, flags, comment, children, groups, sources}
	// 		+- {id, name, variant, kind, flags, comment, children, groups, sources, signatures}
	// 		+- {id, name, variant, kind, flags, comment, children, groups, sources, type, defaultType}

	// mapping
	ID_MAP[parent.id] = {...parent, parents};
	if (ID_GROUP_MAP.hasOwnProperty(parent.id)){
		const id_group = ID_GROUP_MAP[parent.id];
		if (GROUP_TYPES.hasOwnProperty(id_group)){
			GROUP_TYPES[id_group].kinds.add(parent.kind);
			GROUP_TYPES[id_group].variants.add(parent.variant);
		} else console.warn('[-] undefined group types for id group:', id_group);
	}

	// parse groups
	if (Array.isArray(parent.groups)){
		for (let i = 0; i < parent.groups.length; i ++){
			const group = Object(parent.groups[i]);
			if (!(group.title && group.children)){
				console.warn('[-] invalid parse item group.', {i, group});
				continue;
			}
			const group_key = `#${parent.id}-${i}-${group.title.toLowerCase().replace(/[^\w]/g, '-')}`;
			GROUPS_MAP[group_key] = group;
			GROUP_TYPES[group_key] = {key: group_key, kinds: new Set(), variants: new Set()};
			if (parent.id === 0) ROOT_GROUPS.push(group_key);
			if (Array.isArray(group.children)){
				for (const group_child of group.children){
					ID_GROUP_MAP[group_child] = group_key;
				}
			}
		}
	}

	// parse children
	if (Array.isArray(parent.children)){
		for (let i = 0; i < parent.children.length; i ++){
			parse_item(parent.children[i], [...parents, parent.id]);
		}
	}
}