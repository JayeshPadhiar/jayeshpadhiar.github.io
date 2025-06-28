import Header from "./Header";

export default function MainContent({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-4/6 h-full flex flex-col items-center justify-start">
            <Header />
            <div className="w-full h-full flex flex-col items-start justify-start gap-4 overflow-auto" style={{ scrollBehavior: "smooth" }}>
                {children}
            </div>
        </main>
    );
}