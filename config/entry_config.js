const fs = require('fs');
const path = require('path');
const local_path = require('./path_config.js');

const js_src_path = local_path['SRC_JS_PATH'];


//获取文件名 (不带格式后缀)
function getType(file){
	var filename=file || '';
	var index1=filename.lastIndexOf(".");
	var type=filename.substring(index1,-1);
	return type;
}

function get_entry(ENV){
	let js_dir_files = fs.readdirSync(js_src_path); // 获取js 文件夹下的 所有.js 文件
	let object_entry = {};
	
	js_dir_files.map((item)=>{
		object_entry[getType(item)] = path.join(js_src_path, item);
	});
	return object_entry;
}

module.exports = get_entry;