export default function MainContent({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full md:w-4/6 md:h-full flex flex-col items-center justify-start">
            <div className="w-full h-full flex flex-col items-start justify-start gap-4 md:overflow-auto" style={{ scrollBehavior: "smooth" }}>
                {children}
            </div>
        </main>
    );
}