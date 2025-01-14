import conf from '../Conf/conf';
import { Client, Account, ID,Teams } from "appwrite";


export class AuthService {
    client = new Client();
    teams=new Teams();
    account;
    user;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.teams = new Teams(this.client);
            
    }
    async UserAccount() {
        try {
            const userAccount = await this.user.list( []);
            if (userAccount) {
                // call another method
                return await userAccount;
            } else {
               return  userAccount;
            }
        } catch (error) {
            console.log("Appwrite serive :: createAccount :: error", error);
            throw error;
        }
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return await this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            console.log("Appwrite serive :: createAccount :: error", error);
            throw error;
        }
    }
    

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite serive :: login :: error", error);
            throw error;
        }
    }
    
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            
            

          return  await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService