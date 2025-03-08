import conf from '../Conf/conf';
import { ID,Client, Databases,Storage,Query} from "appwrite";

export class Service{
     client=new Client();
     databases;
     bucket;
     constructor(){
          this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
          this.databases = new Databases(this.client);
          this.bucket = new Storage(this.client);
     } 

     async createPost({title, slug, content, featuredImage, status, userId}){
          try {
              return await this.databases.createDocument(
                  conf.appwriteDatabaseId,
                  conf.appwriteCollectionId,
                  slug,
                  {
                      title,
                      content,
                      featuredImage,
                      status,
                      userId,
                  }
              )
          } catch (error) {
              console.log("Appwrite serive :: createPost :: error", error);
          }
      }
     
     async updatePosts(slug,{title,content,featuredImage,status}){
          try{
               await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,{
                         title,
                         content,
                         featuredImage,
                         status
                    }     
               )
               return true
          }
          catch(e){
               console.log("appwrite Error Service::updatePosts",e);
               throw e
          }
     }
     async deletePost(slug){
          try{
               return await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
               )
          }catch(e){
               console.log("appwrite Error Service::deleteDocument",e);
               throw e
          }
     }
     async getPost(slug){
          try{
               return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
               )
          }catch(e){
               console.log("appwrite Error Service::getPost",e);
               
               return false
          }
     }
     async getPosts(queries=[Query.equal("status","active")]){
          try{
               return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries
               )
          }catch(e){
               console.log("appwrite Error Service::getPosts",e);
               throw e
          }
     }
     // upload file
     async uploadFile(file){
          try{
               return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file,
                    
                         
               )
          }catch(e){
               console.log("appwrite Error Service::uploadFile",e);
               throw e
          }
     }
     async  getPostsUserId(queries=[Query.equal("userId","slug")]) {
          try {
               return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries
               );
           
               // console.log(`Page ${page}:`, response.documents);
               // console.log("Total Documents:", response.total);
           
              
             } catch (error) {
               console.error("Error fetching paginated data:!!!!", error.message);
             }
           }

     async deleteFile(fileId){
               try{
                     await this.bucket.deleteFile(
                         conf.appwriteBucketId,
                         fileId
                    )
                    return true
               }catch(e){
                    console.log("appwrite Error Service::deleteFile",e);
                    throw e
               }
     }
     //check this later ok
     getFilePreview(fileId,width=380,height=200,gravity="center",quality=100){
          return  this.bucket.getFilePreview(
              conf.appwriteBucketId,
              fileId,
               width,
               height,
               gravity,
               quality,
              
              
              
          ).toString()
      }
      

}


const service=new Service();
export default service;