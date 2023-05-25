import nodemailer from 'nodemailer';
import config from '../../shared/config';
import * as alt from "alt-server";

class MailService {
    transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.mailService.host,
            port: config.mailService.port,
            auth: {
                user: config.mailService.user,
                pass: config.mailService.password,
            },
        });
    }

    instance() {
        return this.transporter
    }

    async send(to: string, subject: string, text: string) {
        try {
            await this.transporter.sendMail({ from: config.mailService.from, to, subject, text })
            return true;
        } catch (e) {
            alt.logError(e)
            return false;
        }
    }
}

const service = new MailService()

export default service