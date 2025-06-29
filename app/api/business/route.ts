import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Business from "@/models/business.model";
import { dbConnection } from "@/config/db";
import { v2 as cloudinary } from 'cloudinary'
import { authOptions } from "@/lib/authOptions";

export const GET = async () => {
    try {
        await dbConnection();

        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const businesses = await Business.find({ owner: session.user.id });

        return NextResponse.json({ 
            businesses }, 
            { status: 200 }
        );
    } catch {
        return NextResponse.json({ 
            error: "Failed to fetch businesses" },
            { status: 500 }
        );
    }
};



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

async function uploadImage(image: string) {
    try {
        const result = await cloudinary.uploader.upload(image, {
        folder: 'business-logos',
        })
        return result.secure_url
    } catch (error) {
        console.error('Error uploading image:', error)
        throw error
    }
}

export const POST = async (req: Request) => {
  try {
    await dbConnection()
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const name = formData.get('name') as string
    const description = formData.get('description') as string | null
    const industry = formData.get('industry') as string | null
    const logoFile = formData.get('logo') as File | null

    if (!name) {
      return NextResponse.json(
        { error: "Business name is required" }, 
        { status: 400 }
      )
    }

    let logoUrl = ''
    if (logoFile) {
      const arrayBuffer = await logoFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64Image = buffer.toString('base64')
      logoUrl = await uploadImage(`data:${logoFile.type};base64,${base64Image}`)
    }


    const business = await Business.create({
      owner: session.user.id,
      name,
      description: description || undefined,
      industry: industry || undefined,
      logo: logoUrl || undefined,
    })

    return NextResponse.json({ business })
  } catch (error) {
    console.error('Error creating business:', error)
    return NextResponse.json(
      { error: "Failed to create business" }, 
      { status: 500 }
    )
  }
}

export const PUT = async (req: Request) => {
  try {
    await dbConnection()
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const id = formData.get('_id') as string
    const name = formData.get('name') as string
    const description = formData.get('description') as string | null
    const industry = formData.get('industry') as string | null
    const logoFile = formData.get('logo') as File | null
    const existingLogo = formData.get('existingLogo') as string | null

    if (!id || !name) {
      return NextResponse.json(
        { error: "Business ID and name are required" }, 
        { status: 400 }
      )
    }

    const existingBusiness = await Business.findOne({
      _id: id,
      owner: session.user.id
    })

    if (!existingBusiness) {
      return NextResponse.json(
        { error: "Business not found" }, 
        { status: 404 }
      )
    }

    let logoUrl = existingLogo || ''
    if (logoFile) {
      const arrayBuffer = await logoFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64Image = buffer.toString('base64')
      logoUrl = await uploadImage(`data:${logoFile.type};base64,${base64Image}`)
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      id,
      {
        name,
        description: description || undefined,
        industry: industry || undefined,
        logo: logoUrl || undefined
      },
      { new: true }
    )

    return NextResponse.json({ business: updatedBusiness })
  } catch (error) {
    console.error('Error updating business:', error)
    return NextResponse.json(
      { error: "Failed to update business" }, 
      { status: 500 }
    )
  }
}


export const DELETE = async (req: Request) => {
    try {
      await dbConnection()
      const session = await getServerSession(authOptions)

      if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const { searchParams } = new URL(req.url)
      const id = searchParams.get('id')
      console.log(id);
      

      if (!id) {
        return NextResponse.json({ error: "Business ID is required" }, { status: 400 })
      }

      const business = await Business.findOne({ _id: id, owner: session.user.id })
      if (!business) {
        return NextResponse.json({ error: "Business not found" }, { status: 404 })
      }

      await business.deleteOne()

      return NextResponse.json({ message: "Business deleted successfully" }, { status: 200 })
    } catch (error) {
      console.error('Error deleting business:', error)
      return NextResponse.json({ error: "Failed to delete business" }, { status: 500 })
    }
}
