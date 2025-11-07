import React, { useEffect } from 'react';
import { Player, News, GalleryItem } from './constants';
import { Header, Footer, HeroSection, FeaturedPlayersSection, AboutSection, FloatingChatButton, GallerySection, NewsSection } from './components/PublicComponents';

interface PublicWebsiteProps {
    players: Player[];
    news: News[];
    gallery: GalleryItem[];
    onSwitchToAdmin: () => void;
    onSelectPlayer: (player: Player) => void;
    scrollToSection: string | null;
    onScrollComplete: () => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ players, news, gallery, onSwitchToAdmin, onSelectPlayer, scrollToSection, onScrollComplete }) => {
    
    useEffect(() => {
        if (scrollToSection) {
            if (scrollToSection === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const element = document.querySelector(scrollToSection);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
            onScrollComplete(); // Reset the state in App.tsx
        }
    }, [scrollToSection, onScrollComplete]);

    return (
        <div className="bg-[#181818] text-gray-300">
            <Header onSwitchToAdmin={onSwitchToAdmin} />
            <main>
                <HeroSection />
                <FeaturedPlayersSection players={players} onSelectPlayer={onSelectPlayer} />
                <GallerySection gallery={gallery} />
                <NewsSection news={news} />
                <AboutSection />
            </main>
            <Footer onSwitchToAdmin={onSwitchToAdmin} />
            <FloatingChatButton />
        </div>
    );
};