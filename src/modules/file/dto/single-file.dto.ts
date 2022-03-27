import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SingleFileUploadDTO {
    @ApiProperty({
        type: 'file', required: true
    })
    @IsNotEmpty()
    file: any;

    @ApiProperty({
        required: true,
        description: "USER | RESIDENT | REQUEST | BUILDING | EVENT"
    })
    @IsNotEmpty()
    entity: string;
}
