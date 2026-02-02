import SnippetModel from "../SnippetsModel";
import connectToDB from "../../lib/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const snippets = await SnippetModel.find({});
        return NextResponse.json({
            data: snippets
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDB();
        const { snippet } = await req.json(); // Parse the request body

        const res = await SnippetModel.create({ snippet });

        return NextResponse.json({
            data: res // Return the created snippet object
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectToDB();
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const snippetId = new mongoose.Types.ObjectId(id);

        await SnippetModel.findByIdAndDelete(snippetId);

        return NextResponse.json(
            { message: "Snippet deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Failed to delete snippet" },
            { status: 400 }
        );
    }
}
