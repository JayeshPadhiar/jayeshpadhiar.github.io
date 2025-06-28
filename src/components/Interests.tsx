import { FaBook, FaMountain, FaPlane, FaMusic, FaFutbol } from "react-icons/fa";

export default function Interests() {
    const interests = [
        {
            id: 1,
            title: "Books",
            icon: <FaBook />,
        },
        {
            id: 2,
            title: "Mountaineering",
            icon: <FaMountain />,
        },
        {
            id: 3,
            title: "Traveling",
            icon: <FaPlane />,
        },
        {
            id: 4,
            title: "Music",
            icon: <FaMusic />,
        },
        {
            id: 5,
            title: "Football",
            icon: <FaFutbol />,
        },
        
    ]
    const styles = {
        container: "w-full flex flex-col items-start justify-center gap-4 px-8 py-16 border-t-1 border-foreground/10",
        title: "text-2xl font-bold",
        description: "text-sm text-foreground/50",
        interestList: "flex flex-row items-start justify-start gap-2 flex-wrap w-full",
        interestContainer: "flex flex-row items-center justify-start gap-2 w-full",
        interestTitle: "text-lg font-bold",
        interestIcon: "w-6 h-6",
    }
    return (
        <section id="interests" className={styles.container}>
            <h1 className={styles.title}>Interests</h1>
            <div className={styles.interestList}>
                {interests.map((interest) => (
                    <div className={styles.interestContainer} key={interest.id}>
                        <div className={styles.interestIcon}>
                            {interest.icon}
                        </div>
                        <h2 className={styles.interestTitle}>{interest.title}</h2>
                    </div>
                ))}
            </div>
        </section>
    );
}