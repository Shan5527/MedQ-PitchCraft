'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { placeholderImages } from "@/lib/placeholder-images";
import { ArrowLeft, Paperclip, Send, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'expert';
    timestamp: string;
}

const initialMessages: Message[] = [
    { id: 1, text: "Hello, I'm having some sharp stomach pain on my right side.", sender: 'user', timestamp: '10:30 AM' },
    { id: 2, text: "I'm sorry to hear that. I'm Dr. Priya Sharma. Can you tell me when the pain started?", sender: 'expert', timestamp: '10:31 AM' },
];

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputText, setInputText] = useState('');
    const expertAvatar = placeholderImages.find(p => p.id === 'expert-avatar-1');

    const handleSend = () => {
        if (inputText.trim()) {
            const newMessage: Message = {
                id: messages.length + 1,
                text: inputText,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);
            setInputText('');
        }
    };

    return (
        <div className="flex flex-col h-[calc(100dvh-144px)] -m-4 bg-background">
            {/* Header */}
            <header className="flex items-center justify-between p-3 border-b bg-card">
                <div className="flex items-center gap-3">
                    <Button asChild variant="ghost" size="icon">
                        <Link href="/experts">
                           <ArrowLeft />
                        </Link>
                    </Button>
                    {expertAvatar && (
                         <Avatar className="h-10 w-10">
                            <AvatarImage src={expertAvatar.imageUrl} alt="Dr. Priya Sharma" />
                            <AvatarFallback>PS</AvatarFallback>
                        </Avatar>
                    )}
                    <div>
                        <h2 className="font-bold">Dr. Priya Sharma</h2>
                        <p className="text-xs text-muted-foreground">General Physician</p>
                    </div>
                </div>
                <Button variant="destructive" size="sm">
                    <X className="mr-2 h-4 w-4" /> End
                </Button>
            </header>

            {/* Messages */}
            <div className="flex-1 space-y-4 p-4 overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'expert' && expertAvatar && (
                             <Avatar className="h-8 w-8">
                                <AvatarImage src={expertAvatar.imageUrl} />
                                <AvatarFallback>PS</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={`max-w-[75%] rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <footer className="p-3 border-t bg-card">
                <div className="relative">
                    <Input
                        placeholder="Type your message..."
                        className="pr-24"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                            <Paperclip />
                        </Button>
                        <Button onClick={handleSend} size="icon">
                            <Send />
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
