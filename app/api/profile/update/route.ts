import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { dbConnection } from '@/config/db';
import cloudinary from '@/lib/cloudinary';

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: NextRequest) {
    try{
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const name = formData.get('name') as string;
        const file = formData.get('image') as File | null;

        await dbConnection();
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (file && file.size > 0) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const tempFilePath = join('/tmp', `${randomUUID()}.jpg`);
            await writeFile(tempFilePath, buffer);

            const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
                folder: 'user_profiles',
            });

            user.picture = uploadResult.secure_url;
        }

        if (name) user.name = name;

        await user.save();

        return NextResponse.json({ success: true, user });
    }catch{
        return NextResponse.json({
            status: 500, 
            error: 'Failed to update your profile'
        })
    }
}
