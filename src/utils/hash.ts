import * as crypto from 'crypto';

export class Crypto {

    public encryptMD5(text: string): string {
        return crypto.createHash('md5').update(text).digest("hex");
    }

    public encryptSHA1(text: string): string {
        return crypto.createHash('sha1').update(text).digest("hex");
    }
}