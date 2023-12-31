import connectToDb from '@/database/index';
import { NextResponse } from 'next/server';
import ProductCategory from '@/models/category'


export const dynamic = "force-dynamic";


export async function GET(req) {
    await connectToDb();
   
        try {

            const AllCategory = await ProductCategory.find({})
            if (AllCategory) {
                return NextResponse.json({
                    AllCategory,
                    success: true,
                    message: "Category fetched successfully",
                });
            }
            return NextResponse.json({
                success: false,
                message: "Error while getting all category. Please try again",
            });

        } catch (error) {
            console.log("Error while getting all category. Please try again");

            return NextResponse.json({
                success: false,
                message: "Error while getting all category. Please try again",
            });
        }

 

}
