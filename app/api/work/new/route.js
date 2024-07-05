import { connectToDB } from "@mongodb/database";
import { writeFile } from "fs/promises"
import Work from "@models/Work";

export async function POST (req) {
  try {
    /* Connect to MongoDB */
    await connectToDB()

    const data = await req.formData()

    /* Extract info from the data */
    const creator = data.get("creator")
    const category = data.get("category")
    const title = data.get("title")
    const description = data.get("description")
    const price = data.get("price")

    /* Get an array of uploaded photos */
    const photos = data.getAll("workPhotoPaths")

    const workPhotoPaths = []

    /* Process and store each photo  */
    for (const photo of photos) {

        var clouddata=null;
    const dat = new FormData();
    dat.append("file",photo);
    dat.append("upload_preset", "mycloud");
    dat.append("cloud_name","dr2j15ct9");
    try{
      const res = await fetch("https://api.cloudinary.com/v1_1/dr2j15ct9/image/upload",{
        method:'POST',
        body:dat
      })
      clouddata = await res.json();
      console.log(clouddata.url);
      // toast.success("image upload succesful");
    }
    catch(err) {
    console.log(err);
    }
      // // Read the photo as an ArrayBuffer
      // const bytes = await photo.arrayBuffer()

      // // Convert it to a Buffer
      // const buffer = Buffer.from(bytes)

      // Define the destination path for the uploaded file
      const workImagePath = clouddata.url

      // Write the buffer to the filessystem
      // await writeFile(workImagePath, buffer)

      // Store the file path in an array
      workPhotoPaths.push(clouddata.url)
    }

    /* Create a new Work */
    const newWork = new Work({
      creator, category, title, description, price, workPhotoPaths
    })

    await newWork.save()

    return new Response(JSON.stringify(newWork), { status: 200 })
  }
  catch (err) {
    console.log(err)
    return new Response("Failed to create a new Work", { status: 500 })
  }
}

