import { PartnersDisplay } from "@/components/PartnersDisplay";
import { EditAbout, EditLocation, EditPalName, EditPalTag } from "@/components/ProfileAboutEdit";
import ProfileEdit from "@/components/ProfileImageEdit";
import Layout from "@/components/layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default function EditProfile() {

    return (
        <Layout>
             <>
              <Head>
                  <link rel="icon" href="/facepal_icon_logo.png" />
                  <meta name="description" content="The Coolest way to connect with friends and hold money" />
                  <meta name="keywords" content="facepal" />
                  <title>facepal | edit profile</title>
              </Head>
                <section className="flex flex-col justify-center items-center p-2 gap-2">
                    <ProfileEdit />
                    <EditAbout />
                    <EditLocation />
                    <EditPalName />
                    <EditPalTag />
                </section>
            </>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req,context.res,authOptions);
    
    if(!session) {
      return {
        redirect:{
          destination:'/auth',
          permanent:false,
        }
      }
    }
  
    return {
      props:{
        session:session
      }
    }
  }