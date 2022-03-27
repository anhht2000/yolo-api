import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
    copy(from: string, to: string) {
        try {
            const fileName = path.basename(from);
            const currentPath = path.join('public', from);
            const destinationPath = path.join('public', to);
            
            if (!fs.existsSync(destinationPath)){
                fs.mkdirSync(destinationPath, { recursive: true });
            }

            const destinationFullPath = path.join(destinationPath, fileName);

            if (!fs.existsSync(currentPath)){
                return false;
            }

            fs.copyFileSync(currentPath, destinationFullPath);
            
            return to + fileName;
        } catch(error) {
            console.log(error);
            
            return false;
        }
    }
}
