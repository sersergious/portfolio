// app/page.tsx - Portfolio Homepage
import { Home} from "@/components/homepage/Home";

export const metadata = {
  title: 'SerSergious - Research. Develop. Innovate.',
  description: 'Portfolio showcasing cutting-edge research, innovative development projects, and insights into the intersection of technology and science.',
}



export default async function HomePage() {

  return (
    <div className="min-h-screen">
      <Home/>
    </div>
  )
}