import React, { useState, useEffect, useRef } from 'react';
import { GalleryItem, Player, SocialLink, News } from '../constants';
import { TrophyIcon, DownloadIcon } from './icons';

// --- Icon Components ---
const PhoneIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
);
const MailIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25-2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
);
const LocationIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);
const TalkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.056 3 12c0 2.224.89 4.243 2.343 5.75.298.293.413.7.354 1.106l-.523 2.618a.75.75 0 0 0 .935.845l2.618-.523a1.125 1.125 0 0 1 1.106.354A8.963 8.963 0 0 0 12 20.25Z" />
    </svg>
);

// --- Layout Components ---

interface HeaderProps {
    onSwitchToAdmin: () => void;
    onBack?: (hash: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSwitchToAdmin, onBack }) => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        e.preventDefault(); // Always prevent default and handle scrolling ourselves for smoothness
        
        if (onBack) {
            onBack(hash);
        } else {
            // We are on the homepage, handle smooth scrolling
            if (hash === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };
    
    return (
        <header className="bg-black/80 backdrop-blur-sm fixed top-0 z-40 w-full">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                 <div>
                    <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-white">
                        <span className="text-3xl font-black tracking-wider block leading-none">MARQUES</span>
                        <span className="text-[0.6rem] tracking-[0.2em] font-light text-gray-300 block">PLAYER'S AGENT</span>
                    </a>
                </div>
                <div className="flex items-center gap-8">
                    <ul className="hidden md:flex items-center space-x-8 text-sm font-semibold uppercase">
                        <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-[#E58A42] transition-colors">Home</a></li>
                        <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-[#E58A42] transition-colors">About Us</a></li>
                        <li><a href="#players" onClick={(e) => handleNavClick(e, '#players')} className="hover:text-[#E58A42] transition-colors">Players</a></li>
                        <li><a href="#gallery" onClick={(e) => handleNavClick(e, '#gallery')} className="hover:text-[#E58A42] transition-colors">Gallery</a></li>
                        <li><a href="#news" onClick={(e) => handleNavClick(e, '#news')} className="hover:text-[#E58A42] transition-colors">News</a></li>
                        <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-[#E58A42] transition-colors">Contact</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export const Footer: React.FC<{ onSwitchToAdmin: () => void }> = ({ onSwitchToAdmin }) => {
    return (
        <footer className="bg-black border-t border-gray-800" id="contact">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1: Logo & Desc */}
                    <div>
                        <a href="#" className="text-white">
                            <span className="text-3xl font-black tracking-wider block leading-none">MARQUES</span>
                            <span className="text-[0.6rem] tracking-[0.2em] font-light text-gray-300 block">PLAYER'S AGENT</span>
                        </a>
                        <p className="mt-4 text-gray-400 text-sm max-w-sm">
                           Representando os melhores talentos do futebol mundial. Descobrimos e desenvolvemos carreiras de sucesso no esporte mais amado do planeta.
                        </p>
                    </div>
                    
                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white uppercase tracking-wider">Links Rápidos</h3>
                        <ul className="mt-4 space-y-2 text-gray-400 text-sm">
                             <li><a href="#home" className="hover:text-white">Home</a></li>
                             <li><a href="#about" className="hover:text-white">Sobre Nós</a></li>
                             <li><a href="#players" className="hover:text-white">Jogadores</a></li>
                             <li><a href="#gallery" className="hover:text-white">Galeria</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                         <h3 className="font-semibold text-white uppercase tracking-wider">Contato</h3>
                        <ul className="mt-4 space-y-3 text-gray-400 text-sm">
                            <li className="flex items-center gap-2"><PhoneIcon className="w-4 h-4 text-gray-500" /> +55 (11) 98888-9999</li>
                            <li className="flex items-center gap-2"><MailIcon className="w-4 h-4 text-gray-500" /> contato@marquesagency.com</li>
                            <li className="flex items-center gap-2"><LocationIcon className="w-4 h-4 text-gray-500" /> São Paulo, SP</li>
                        </ul>
                    </div>
                </div>
                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Marques. Todos os direitos reservados.</p>
                    <button onClick={onSwitchToAdmin} className="underline hover:text-white mt-4 sm:mt-0">Admin Panel</button>
                </div>
            </div>
        </footer>
    );
}

export const FloatingChatButton = () => (
    <button className="fixed bottom-6 right-6 bg-[#E58A42] text-black px-5 py-3 rounded-full shadow-2xl hover:bg-orange-400 hover:scale-105 transition-all duration-300 z-50 flex items-center gap-2.5 font-bold text-sm">
        <TalkIcon className="w-6 h-6" />
        <span>Talk with Us</span>
    </button>
);


// --- Section Components ---

export const HeroSection = () => {
    const slides = [
        {
            bgImage: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "GESTÃO DE CARREIRA",
            subtitle: "Desenvolvendo carreiras de sucesso no futebol.",
        },
        {
            bgImage: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "TALENTOS GLOBAIS",
            subtitle: "Conectando jogadores excepcionais aos maiores clubes do mundo.",
        },
        {
            bgImage: "https://images.pexels.com/photos/159556/football-player-game-competition-159556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "FUTURO BRILHANTE",
            subtitle: "Seu próximo passo para o estrelato começa aqui.",
        },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> for browser compatibility.
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1)),
            5000 // Change slide every 5 seconds
        );
        return () => {
            resetTimeout();
        };
    }, [currentIndex, slides.length]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };


    return (
        <section id="home" className="h-screen relative overflow-hidden">
            {/* Slides Container */}
            <div
                className="whitespace-nowrap h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(${-currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="h-full w-full inline-block bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${slide.bgImage})` }}
                    >
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="container mx-auto px-6 h-full flex items-center relative z-10 text-white">
                            <div className={`max-w-3xl transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-widest">{slide.title}</h2>
                                <p className="mt-4 text-base md:text-lg text-gray-300 max-w-md">{slide.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-20">
                 <button onClick={prevSlide} className="text-white/50 hover:text-white p-3 bg-black/20 rounded-full transition-all group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 transform group-hover:scale-110">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                 <button onClick={nextSlide} className="text-white/50 hover:text-white p-3 bg-black/20 rounded-full transition-all group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 transform group-hover:scale-110">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>


            {/* Carousel Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                     <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                            currentIndex === index ? 'bg-[#E58A42]' : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export const FeaturedPlayersSection: React.FC<{ players: Player[], onSelectPlayer: (player: Player) => void }> = ({ players, onSelectPlayer }) => (
    <section id="players" className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider">JOGADORES EM DESTAQUE</h2>
                <div className="w-16 h-1 bg-[#E58A42] mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {players.map(player => <PlayerCard key={player.id} player={player} onSelectPlayer={onSelectPlayer} />)}
            </div>
        </div>
    </section>
);

export const GallerySection: React.FC<{ gallery: GalleryItem[] }> = ({ gallery }) => {
    const featuredGallery = gallery.filter(item => item.featured && item.type === 'image');
    const displayItems = (featuredGallery.length > 0 ? featuredGallery : gallery.filter(item => item.type === 'image')).slice(0, 6);

    if (displayItems.length === 0) return null;

    return (
        <section id="gallery" className="py-20 bg-[#181818]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider">Galeria</h2>
                    <div className="w-16 h-1 bg-[#E58A42] mx-auto mt-4"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {displayItems.map(item => (
                        <div key={item.id} className="group relative aspect-video md:aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                            <img src={item.url} alt={item.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <p className="text-white text-sm font-medium">{item.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <button className="border border-gray-600 text-gray-300 font-semibold py-3 px-8 rounded-sm hover:bg-gray-800 hover:border-gray-500 transition-all uppercase text-sm">
                        Ver Galeria Completa
                    </button>
                </div>
            </div>
        </section>
    );
};

const NewsCard: React.FC<{ item: News }> = ({ item }) => (
    <div className="bg-[#1F1F1F] rounded-lg overflow-hidden group transition-transform hover:-translate-y-1">
        <div className="p-6">
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{item.publishedAt}</p>
            <h3 className="text-xl font-bold text-white mt-2 group-hover:text-[#E58A42] transition-colors line-clamp-2">{item.title}</h3>
            <p className="text-gray-400 text-sm mt-3 line-clamp-3 leading-relaxed">{item.content}</p>
            <a href="#" className="text-sm font-semibold text-[#E58A42] mt-4 inline-block group-hover:underline">
                Ler Mais &rarr;
            </a>
        </div>
    </div>
);

export const NewsSection: React.FC<{ news: News[] }> = ({ news }) => {
    const publishedNews = news.filter(n => n.status === 'Published').slice(0, 3);

    if (publishedNews.length === 0) return null;

    return (
        <section id="news" className="py-20 bg-[#121212]">
             <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider">Últimas Notícias</h2>
                    <div className="w-16 h-1 bg-[#E58A42] mx-auto mt-4"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {publishedNews.map(item => <NewsCard key={item.id} item={item} />)}
                </div>
            </div>
        </section>
    )
};


export const AboutSection = () => (
    <section id="about" className="py-20 bg-[#181818]">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider">SOBRE A MARQUES</h2>
                    <div className="w-16 h-1 bg-[#E58A42] mt-4 mb-6"></div>
                    <p className="text-gray-400 leading-relaxed">
                        Com mais de 10 anos de experiência no mercado do futebol, a Marques Player's Agent é uma das principais agências de representação de jogadores do Brasil e América Latina.
                    </p>
                    <p className="mt-4 text-gray-400 leading-relaxed">
                        Nossa missão é conectar talentos excepcionais aos melhores clubes do mundo, proporcionando oportunidades únicas de crescimento profissional e desenvolvimento de carreira no futebol internacional.
                    </p>
                    <div className="grid grid-cols-3 gap-8 mt-10">
                        <div>
                            <p className="text-4xl font-bold text-[#E58A42]">50+</p>
                            <p className="text-sm text-gray-400 mt-2">Jogadores Representados</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-[#E58A42]">25+</p>
                            <p className="text-sm text-gray-400 mt-2">Clubes Parceiros</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-[#E58A42]">10+</p>
                            <p className="text-sm text-gray-400 mt-2">Anos de Experiência</p>
                        </div>
                    </div>
                </div>
                <div>
                    <img 
                        src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Marques Agency meeting"
                        className="rounded-lg shadow-2xl"
                    />
                </div>
            </div>
        </div>
    </section>
);


// --- Card Components ---

const getFlagEmoji = (nationality: string) => {
    switch (nationality.toLowerCase()) {
        case 'brasil': return '🇧🇷';
        case 'argentina': return '🇦🇷';
        case 'espanha': return '🇪🇸';
        case 'uruguai': return '🇺🇾';
        case 'méxico': return '🇲🇽';
        default: return '🏳️';
    }
};

const PlayerCard: React.FC<{ player: Player, onSelectPlayer: (player: Player) => void }> = ({ player, onSelectPlayer }) => (
    <button onClick={() => onSelectPlayer(player)} className="bg-[#1F1F1F] rounded-lg overflow-hidden group text-left w-full transition-transform hover:-translate-y-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#121212] focus:ring-[#E58A42]">
        <div className="aspect-[3/4] overflow-hidden">
            <img src={player.photoUrl} alt={player.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-1">{player.name}</h3>
            <p className="text-gray-400 text-sm">{player.position}</p>
            <div className="text-xs mt-3 text-gray-400 flex items-center gap-2">
                <span>{getFlagEmoji(player.nationality)}</span>
                <span>{player.nationality}</span>
                <span className="text-gray-600">•</span>
                <span>{player.age} anos</span>
            </div>
        </div>
    </button>
);


// --- Player Detail Page ---

export const PlayerDetailPage: React.FC<{ 
    player: Player, 
    playerGallery: GalleryItem[],
    onBack: (hash: string) => void, 
    onSwitchToAdmin: () => void 
}> = ({ player, playerGallery, onBack, onSwitchToAdmin }) => {
    return (
        <div className="bg-[#181818] text-gray-300">
            <Header onSwitchToAdmin={onSwitchToAdmin} onBack={onBack} />
            <main className="container mx-auto px-6 py-32 animate-fade-in">
                 <button 
                    onClick={() => onBack('')} 
                    className="mb-8 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-semibold"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Voltar para jogadores
                </button>
                
                {/* Main Player Info */}
                <section className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-start">
                    {/* Left side: Details */}
                    <div className="md:col-span-3">
                        <h2 className="text-5xl lg:text-6xl font-black text-white uppercase tracking-wider">{player.name}</h2>
                        <div className="w-24 h-1 bg-[#E58A42] mt-4 mb-8"></div>
                        <div className="space-y-3 text-lg text-gray-300">
                            <p><span className="font-semibold text-gray-400 w-32 inline-block">Posição:</span> {player.position}</p>
                            <p><span className="font-semibold text-gray-400 w-32 inline-block">Nacionalidade:</span> {player.nationality}</p>
                            <p><span className="font-semibold text-gray-400 w-32 inline-block">Idade:</span> {player.age} anos</p>
                            <p><span className="font-semibold text-gray-400 w-32 inline-block">Clube Atual:</span> {player.club}</p>
                        </div>
                        <p className="mt-8 text-gray-400 max-w-xl leading-relaxed">{player.bio}</p>
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <button className="bg-[#E58A42] text-black font-semibold py-3 px-6 rounded-sm hover:bg-orange-400 transition-all uppercase text-sm">
                                Entrar em Contato
                            </button>
                            <button className="border border-gray-600 text-gray-300 font-semibold py-3 px-6 rounded-sm hover:bg-gray-800 hover:border-gray-500 transition-all flex items-center gap-2 uppercase text-sm">
                                <DownloadIcon className="w-5 h-5" />
                                Download CV
                            </button>
                        </div>
                    </div>
                    {/* Right side: Photo */}
                    <div className="md:col-span-2">
                        <img src={player.photoUrl} alt={player.name} className="rounded-lg w-full aspect-[4/5] object-cover shadow-2xl" />
                    </div>
                </section>

                {/* Video Highlight Section */}
                {player.youtubeUrl && (
                    <section className="mt-24">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-white uppercase tracking-wider">Vídeo em Destaque</h3>
                            <div className="w-16 h-0.5 bg-[#E58A42] mx-auto mt-3"></div>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="aspect-video">
                                <iframe
                                    className="w-full h-full rounded-lg shadow-2xl"
                                    src={player.youtubeUrl}
                                    title={`Vídeo em destaque de ${player.name}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </section>
                )}

                {/* Photo Gallery Section */}
                {playerGallery.length > 0 && (
                     <section className="mt-24">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-white uppercase tracking-wider">Galeria de Fotos</h3>
                            <div className="w-16 h-0.5 bg-[#E58A42] mx-auto mt-3"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {playerGallery.slice(0, 3).map((item) => (
                                <div key={item.id} className="aspect-square bg-[#1F1F1F] rounded-lg overflow-hidden shadow-lg">
                                    <img 
                                        src={item.url} 
                                        alt={item.caption || `Foto de ${player.name}`} 
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Stats */}
                <section className="mt-24">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-white uppercase tracking-wider">Estatísticas da Temporada</h3>
                        <div className="w-16 h-0.5 bg-[#E58A42] mx-auto mt-3"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-[#1F1F1F] p-8 rounded-lg text-center">
                            <p className="text-6xl font-black text-[#E58A42]">{player.stats.goals}</p>
                            <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">Gols</p>
                        </div>
                        <div className="bg-[#1F1F1F] p-8 rounded-lg text-center">
                            <p className="text-6xl font-black text-[#E58A42]">{player.stats.assists}</p>
                            <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">Assistências</p>
                        </div>
                        <div className="bg-[#1F1F1F] p-8 rounded-lg text-center">
                            <p className="text-6xl font-black text-[#E58A42]">{player.stats.games}</p>
                            <p className="text-gray-400 mt-2 text-sm uppercase tracking-wider">Jogos</p>
                        </div>
                    </div>
                </section>

                {/* Achievements */}
                <section className="mt-24">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-white uppercase tracking-wider">Conquistas e Prêmios</h3>
                        <div className="w-16 h-0.5 bg-[#E58A42] mx-auto mt-3"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {player.achievements.length > 0 ? (
                            player.achievements.map((ach, index) => (
                                <div key={index} className="bg-[#1F1F1F] p-6 rounded-lg flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                         <TrophyIcon className="w-6 h-6 text-[#E58A42]" />
                                    </div>
                                    <p className="text-gray-300 font-medium">{ach}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 md:col-span-2">Nenhuma conquista registrada.</p>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className="mt-24 text-center bg-[#1F1F1F] py-16 px-6 rounded-lg">
                    <h3 className="text-3xl font-bold text-white uppercase tracking-wider">Interessado em {player.name}?</h3>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Entre em contato conosco para discutir oportunidades de transferência ou parcerias.</p>
                    <div className="mt-8">
                        <button className="bg-[#E58A42] text-black font-semibold py-3 px-8 rounded-sm hover:bg-orange-400 transition-all text-base uppercase">
                            Entrar em Contato
                        </button>
                    </div>
                </section>
            </main>
            <Footer onSwitchToAdmin={onSwitchToAdmin} />
        </div>
    );
};