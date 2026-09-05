import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Mira ♡ little ocean | มิร่า · Full Stack Developer',description:'บ้านเล็ก ๆ ริมทะเลของมิร่า — About me, gallery & full stack development. รับทำเว็บไซต์เริ่มต้น 2,000 บาท'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="th"><body>{children}</body></html>}
