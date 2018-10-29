import * as crypto from 'crypto';

export class Crypto {

    private key: string = 'secret';
    private cipher: any = crypto.createCipher('aes-256-cbc', this.key);
    private decipher: any = this.decipher =  crypto.createDecipher('aes-256-cbc', this.key);

    public encryptSHA(text: string): string {
        let encrypted = this.cipher.update(text, 'utf8', 'base64');
        return encrypted += this.cipher.final('base64')
    }

    public decryptSHA(text: string): string {
        let decrypted = this.decipher.update(text, 'base64', 'utf8');
        return decrypted += this.decipher.final('utf8');
    }

    public encryptMD5(text: string) {
       return crypto.createHash('md5').update(text).digest('hex');
    }
}
