import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FaLaptopCode, FaGraduationCap, FaBriefcase, FaMicrochip } from 'react-icons/fa6';
import Image from 'next/image';

interface CategoryProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

interface WorkshopSectionProps {
    title: string;
    items: string[];
    imageSrc: string;
}

const cardVariants: Variants = {
    hover: { 
        scale: 1.03,
        y: -5,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

const CategoryCard: React.FC<CategoryProps> = ({ title, description, icon, color }) => (
    <motion.div 
        className='w-full min-h-[9rem] bg-white dark:bg-gray-800 shadow-md hover:shadow-xl rounded-2xl py-6 px-6 border-t-4 border-indigo-600 dark:border-indigo-400 flex gap-4 transition-shadow duration-300'
        variants={cardVariants}
        whileHover="hover"
        initial="initial"
        animate="animate"
    >
        <div className={`p-3 rounded-xl ${color} text-white text-2xl h-fit flex items-center justify-center shrink-0`}>
            {icon}
        </div>
        <div>
            <h3 className="text-gray-900 dark:text-gray-100 font-bold text-lg">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

const WorkshopSection: React.FC<WorkshopSectionProps> = ({ title, items, imageSrc }) => (
    <motion.div 
        className="w-full flex flex-col md:flex-row items-center justify-center gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="w-full md:w-1/2">
            <h3 className="text-center md:text-left text-xl md:text-2xl font-bold mb-5 text-indigo-600 dark:text-indigo-400">{title}</h3>
            <ul className="text-sm md:text-base px-5 md:px-0 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                {items.map((item, index) => (
                    <motion.li 
                        key={index}
                        className="leading-relaxed"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {item}
                    </motion.li>
                ))}
            </ul>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
            <motion.div
                className="w-72 h-72 md:w-96 md:h-96 relative flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl overflow-hidden p-4 border border-indigo-100 dark:border-indigo-900/50"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Image 
                    className="max-h-full max-w-full object-contain rounded-lg"
                    src={imageSrc} 
                    alt={title}
                    width={384}
                    height={384}
                />
            </motion.div>
        </div>
    </motion.div>
);

const WorkshopsCategories: React.FC = () => {
    const categories: CategoryProps[] = [
        { 
            title: "Technical Bootcamps", 
            description: "Intense, hands-on coding and software development bootcamps focused on building web applications, databases, and core software solutions.",
            icon: <FaLaptopCode />,
            color: "bg-blue-600"
        },
        { 
            title: "Academic Seminars", 
            description: "Interactive seminars hosted by educational institutions and industry leaders on state-of-the-art academic subjects, research progress, and theory.",
            icon: <FaGraduationCap />,
            color: "bg-emerald-600"
        },
        { 
            title: "Career Development", 
            description: "Workshops designed to enhance career opportunities, resume building, interview preparations, soft skills, and professional networking.",
            icon: <FaBriefcase />,
            color: "bg-amber-600"
        },
        { 
            title: "Innovation & Research", 
            description: "Delve into advanced tech fields such as Machine Learning, Artificial Intelligence, Robotics, and IoT through detailed sessions and project demonstrations.",
            icon: <FaMicrochip />,
            color: "bg-purple-600"
        }
    ];

    const highlights: WorkshopSectionProps[] = [
        {
            title: "Hands-on Programming",
            items: [
                "Gain experience in full-stack programming, cloud architecture, and database operations.",
                "Learn directly from experienced peers and senior developers in collaborative live coding sessions.",
                "Create functional real-world projects that enhance your portfolio and practical tech stack expertise."
            ],
            imageSrc: "/svg/innovation.svg"
        },
        {
            title: "Expert Mentorship",
            items: [
                "Get structural guidance and feedback from institutional professors and industry representatives.",
                "Build collaborative bridges between academic projects and actual industry applications.",
                "Participate in Q&A sessions to clarify doubts regarding career progression and research opportunities."
            ],
            imageSrc: "/svg/learning.svg"
        }
    ];

    return (
        <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <section className="mt-5">
                <motion.h2 
                    className="text-2xl md:text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Workshop & Event Categories
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((category, index) => (
                        <motion.div 
                            key={index} 
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: index * 0.1 }}
                        >
                            <CategoryCard {...category} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <div className="flex justify-center my-12">
                <hr className="w-3/4 border-gray-300 dark:border-gray-700" />
            </div>

            <section className="flex flex-col items-center gap-12">
                <motion.h2 
                    className="text-2xl md:text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Key Workshop Focus Areas
                </motion.h2>
                {highlights.map((highlight, index) => (
                    <React.Fragment key={index}>
                        <WorkshopSection {...highlight} />
                        {index < highlights.length - 1 && (
                            <div className="border-b border-gray-300 dark:border-gray-750 w-3/4 my-4"></div>
                        )}
                    </React.Fragment>
                ))}
            </section>
        </motion.div>
    );
};

export default WorkshopsCategories;
