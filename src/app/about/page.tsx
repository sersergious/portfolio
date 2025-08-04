// app/about/page.tsx
import { Metadata } from 'next'
import {About} from "@/components/about/About";

export const metadata: Metadata = {
    title: 'About Me',
    description: 'Passionate developer and researcher exploring the intersection of mathematics, computer science, and artificial intelligence',
}

export default function AboutPage() {
    return (
        <About/>
    )
}