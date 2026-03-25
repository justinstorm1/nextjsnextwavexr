"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Bold, Check, Italic, PlusIcon, Underline, Link as LinkIcon, Trash2, Type } from "lucide-react";
import React, { useRef, useState } from "react";

export default function ArticlePage() {
    const authors = useQuery(api.articles.getAuthors);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    
    const [headerImage, setHeaderImage] = useState("");
    const [title, setTitle] = useState("");
    const [authorId, setAuthorId] = useState<Id<"authors"> | null>(null);
    const [textBlocks, setTextBlocks] = useState<string[]>([]);

    const handleContainerClick = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setHeaderImage(URL.createObjectURL(file));
    }

    const applyFormat = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const changeSize = (size: string) => {
        // execCommand 'fontSize' takes values 1-7
        applyFormat("fontSize", size);
    };

    const addLink = () => {
        const url = window.prompt("Enter the URL:");
        if (url) {
            const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
            applyFormat("createLink", formattedUrl);
        }
    };

    const handleAddBlock = () => {
        const content = editorRef.current?.innerHTML;
        if (content && content !== "<br>" && content.trim() !== "") {
            setTextBlocks(prev => [...prev, content]);
            if (editorRef.current) editorRef.current.innerHTML = "";
        }
    };

    return (
        <main className="p-10 max-w-4xl mx-auto">
            {/* Global styling for both editor and preview */}
            <style dangerouslySetInnerHTML={{ __html: `
                .prose a, [contenteditable] a {
                    color: #6366f1 !important;
                    text-decoration: underline !important;
                    font-weight: 500;
                }
                /* Map browser font sizes to Tailwind-like scaling */
                font[size="1"] { font-size: 0.75rem; }
                font[size="2"] { font-size: 0.875rem; }
                font[size="3"] { font-size: 1rem; }
                font[size="4"] { font-size: 1.25rem; }
                font[size="5"] { font-size: 1.5rem; }
                font[size="6"] { font-size: 1.875rem; }
                font[size="7"] { font-size: 2.25rem; }
            `}} />

            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            
            <div 
                onClick={handleContainerClick}
                className="cursor-pointer overflow-hidden border border-dashed aspect-[16/9] rounded-2xl flex items-center justify-center transition hover:bg-white/5 bg-muted/20"
            >
                {headerImage ? (
                    <img src={headerImage} alt="Header" className="w-full h-full object-cover object-center" />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <PlusIcon />
                        <span className="text-sm">Click to upload header image</span>
                    </div>
                )}
            </div>

            <div className="py-5 flex flex-col gap-2">
                <input 
                    placeholder="Article Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-3xl font-bold border-none bg-transparent outline-none"
                />
                <Select onValueChange={(val) => setAuthorId(val as Id<"authors">)}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Select an author" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {authors?.map((author) => (
                                <SelectItem key={author._id} value={author._id}>{author.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            {/* Displayed Blocks (Preview) */}
            <div className="py-5 space-y-4">
                {textBlocks.map((t, index) => (
                    <div key={index} className="flex group gap-4 items-start">
                        <div 
                            className="prose prose-invert flex-1 text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t }} 
                        />
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="opacity-0 group-hover:opacity-100 text-destructive"
                            onClick={() => setTextBlocks(prev => prev.filter((_, i) => i !== index))}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* Editor Container */}
            <div className="py-5">
                <Card className="bg-muted/10 border-primary/20">
                    <div className="border-b bg-muted/30 p-2 flex items-center gap-2">
                        {/* Text Size Control */}
                        <Select onValueChange={changeSize}>
                            <SelectTrigger className="w-[110px] h-8 text-xs">
                                <Type className="h-3 w-3 mr-2" />
                                <SelectValue placeholder="Size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2">Small</SelectItem>
                                <SelectItem value="3">Normal</SelectItem>
                                <SelectItem value="5">Large</SelectItem>
                                <SelectItem value="7">Huge</SelectItem>
                            </SelectContent>
                        </Select>

                        <Separator orientation="vertical" className="h-6" />

                        <Button variant="ghost" size="sm" onClick={() => applyFormat('bold')}><Bold className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => applyFormat('italic')}><Italic className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => applyFormat('underline')}><Underline className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={addLink}><LinkIcon className="h-4 w-4" /></Button>

                        <Button
                            className="ml-auto" 
                            variant='secondary' 
                            size='sm'
                            onClick={handleAddBlock}
                        >
                            <Check className="h-4 w-4 mr-2" /> 
                            Add Block
                        </Button>
                    </div>
                    <CardContent className="p-0">
                        <div
                            ref={editorRef}
                            contentEditable
                            className="min-h-[200px] p-4 outline-none prose prose-invert max-w-none text-lg leading-relaxed"
                        />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}