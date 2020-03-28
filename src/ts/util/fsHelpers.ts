import fs from 'mz/fs'
import path from 'path'

export namespace FsHelpers {
	
	export function getAllFiles(dirPath: string): string[] {
		const files = fs.readdirSync(dirPath)
	   
		const arrayOfFiles: string[] = []
	   
		for(const file of files) {
			if (fs.statSync(dirPath + "/" + file).isDirectory())
				arrayOfFiles.push(...getAllFiles(dirPath + "/" + file))
			else
				arrayOfFiles.push(path.join(path.resolve(dirPath), file))
		}
	   
		return arrayOfFiles
	}
	
}