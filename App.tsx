import React, { useState, useMemo, useEffect, useRef } from 'react';
import { players as initialPlayers, Player, news as initialNews, News, gallery as initialGallery, GalleryItem, videos as initialVideos, Video } from './constants';
import { 
    DashboardIcon, PlayersIcon, ContentIcon, GalleryIcon, NewsIcon, SettingsIcon, LogoutIcon, 
    PlusIcon, EditIcon, TrashIcon, SaveIcon, VideoIcon, StarIcon 
} from './components/icons';
import { PublicWebsite } from './PublicWebsite';
import { PlayerDetailPage } from './components/PublicComponents';

type Page = 'dashboard' | 'players' | 'content' | 'gallery' | 'news' | 'settings';

// --- Reusable Components ---

const InputField = ({ label, id, type = 'text', value, onChange, required = false }: { label: string, id: string, type?: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        <input 
            type={type} 
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-1 focus:ring-[#E58A42] focus:outline-none"
        />
    </div>
);

const TextAreaField = ({ label, id, value, onChange, required = false }: { label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, required?: boolean }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        <textarea 
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            rows={3}
            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-1 focus:ring-[#E58A42] focus:outline-none"
        />
    </div>
);

// FIX: Made children prop optional to resolve spurious TypeScript errors.
const SelectField = ({ label, id, value, onChange, children, required = false }: { label: string, id: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children?: React.ReactNode, required?: boolean }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-[#2a2a2a] border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-1 focus:ring-[#E58A42] focus:outline-none"
        >
            {children}
        </select>
    </div>
);

// FIX: Made children prop optional to resolve spurious TypeScript errors.
const Modal = ({ title, children, onClose }: { title: string, children?: React.ReactNode, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
        <div className="bg-[#1F1F1F] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto">
                {children}
            </div>
        </div>
    </div>
);

const Toast = ({ message, show, onHide }: { message: string, show: boolean, onHide: () => void }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onHide();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onHide]);

    return (
        <div className={`fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 ${show ? 'translate-x-0' : 'translate-x-[calc(100%+20px)]'}`}>
            {message}
        </div>
    );
};

// --- Page-specific Components ---

const Sidebar = ({ activePage, setActivePage, onLogout }: { activePage: Page, setActivePage: (page: Page) => void, onLogout: () => void }) => {
    const navItems = useMemo(() => [
        { id: 'dashboard', icon: DashboardIcon, label: 'Dashboard' },
        { id: 'players', icon: PlayersIcon, label: 'Jogadores' },
        { id: 'content', icon: ContentIcon, label: 'Conteúdo' },
        { id: 'gallery', icon: GalleryIcon, label: 'Galeria' },
        { id: 'news', icon: NewsIcon, label: 'Notícias' },
        { id: 'settings', icon: SettingsIcon, label: 'Configurações' },
    ], [])  as { id: Page, icon: React.FC<{className?: string}>, label: string }[];

    return (
        <aside className="bg-[#1F1F1F] text-gray-300 w-64 flex flex-col fixed h-full">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-white tracking-wider">marques</h1>
                <p className="text-sm text-gray-400">Painel Administrativo</p>
            </div>
            <nav className="flex-1 px-4">
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setActivePage(item.id); }}
                                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                                    activePage === item.id ? 'bg-[#E58A42] text-white' : 'hover:bg-gray-700'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700">
                    <LogoutIcon className="w-5 h-5" />
                    <span>Sair</span>
                </a>
            </div>
        </aside>
    );
};

const Dashboard = ({ playerCount, newsCount, galleryCount }: { playerCount: number, newsCount: number, galleryCount: number }) => (
    <div>
        <h2 className="text-3xl font-bold text-white">Dashboard</h2>
        <p className="text-gray-400 mt-1">Visão geral do sistema</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-[#1F1F1F] p-6 rounded-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400">Jogadores</p>
                        <p className="text-4xl font-bold mt-2">{playerCount}</p>
                    </div>
                    <PlayersIcon className="w-6 h-6 text-blue-400" />
                </div>
            </div>
            <div className="bg-[#1F1F1F] p-6 rounded-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400">Conteúdo</p>
                        <p className="text-4xl font-bold mt-2">0</p>
                    </div>
                    <ContentIcon className="w-6 h-6 text-green-400" />
                </div>
            </div>
            <div className="bg-[#1F1F1F] p-6 rounded-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400">Galeria</p>
                        <p className="text-4xl font-bold mt-2">{galleryCount}</p>
                    </div>
                    <GalleryIcon className="w-6 h-6 text-purple-400" />
                </div>
            </div>
            <div className="bg-[#1F1F1F] p-6 rounded-lg">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400">Notícias</p>
                        <p className="text-4xl font-bold mt-2">{newsCount}</p>
                    </div>
                    <NewsIcon className="w-6 h-6 text-yellow-400" />
                </div>
            </div>
        </div>
    </div>
);

const PlayersPage = ({ players, setPlayers, onAdd, onEdit }: { players: Player[], setPlayers: React.Dispatch<React.SetStateAction<Player[]>>, onAdd: () => void, onEdit: (player: Player) => void }) => {
    const deletePlayer = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este jogador?')) {
            setPlayers(currentPlayers => currentPlayers.filter(p => p.id !== id));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Jogadores</h2>
                    <p className="text-gray-400 mt-1">Gerencie os jogadores</p>
                </div>
                <button onClick={onAdd} className="bg-[#E58A42] text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 hover:bg-opacity-90 transition-all">
                    <PlusIcon className="w-5 h-5" />
                    Adicionar Jogador
                </button>
            </div>
            <div className="bg-[#1F1F1F] rounded-lg mt-8 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-700">
                        <tr>
                            <th className="p-4 font-semibold">Nome</th>
                            <th className="p-4 font-semibold">Posição</th>
                            <th className="p-4 font-semibold">Nacionalidade</th>
                            <th className="p-4 font-semibold">Idade</th>
                            <th className="p-4 font-semibold">Clube Atual</th>
                            <th className="p-4 font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.length > 0 ? players.map(player => (
                            <tr key={player.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-800/50">
                                <td className="p-4 capitalize">{player.name.toLowerCase()}</td>
                                <td className="p-4">{player.position}</td>
                                <td className="p-4">{player.nationality}</td>
                                <td className="p-4">{player.age}</td>
                                <td className="p-4">{player.club}</td>
                                <td className="p-4">
                                    <div className="flex gap-4">
                                        <button onClick={() => onEdit(player)} className="text-gray-400 hover:text-white"><EditIcon className="w-5 h-5"/></button>
                                        <button onClick={() => deletePlayer(player.id)} className="text-gray-400 hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                           <tr>
                                <td colSpan={6} className="text-center p-8 text-gray-500">
                                    Nenhum jogador cadastrado.
                                </td>
                           </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PlayerFormModal = ({ player, onSave, onClose }: { player: Player | null, onSave: (player: Player) => void, onClose: () => void }) => {
    const [formData, setFormData] = useState<Omit<Player, 'id'>>({
        name: '', photoUrl: '', position: '', nationality: '', age: 0, club: '', bio: '',
        stats: { goals: 0, assists: 0, games: 0 }, achievements: [], youtubeUrl: '',
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (player) {
            setFormData(player);
        } else {
            setFormData({
                name: '', photoUrl: '', position: '', nationality: '', age: 16, club: '', bio: '',
                stats: { goals: 0, assists: 0, games: 0 }, achievements: [], youtubeUrl: '',
            });
        }
    }, [player]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name in formData.stats) {
            setFormData(prev => ({ ...prev, stats: { ...prev.stats, [name]: Number(value) } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: name === 'age' ? Number(value) : value }));
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleUploadButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalPlayer = { ...formData, id: player?.id || Date.now() };
        onSave(finalPlayer);
    };

    return (
        <Modal title={player ? 'Editar Jogador' : 'Adicionar Jogador'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Nome" id="name" value={formData.name} onChange={(e) => handleChange(e)} required />
                    <InputField label="Posição" id="position" value={formData.position} onChange={(e) => handleChange(e)} required />
                    <InputField label="Nacionalidade" id="nationality" value={formData.nationality} onChange={(e) => handleChange(e)} required />
                    <InputField label="Idade" id="age" type="number" value={formData.age} onChange={(e) => handleChange(e)} required />
                    <InputField label="Clube Atual" id="club" value={formData.club} onChange={(e) => handleChange(e)} required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Foto do Jogador</label>
                    <div className="mt-1 flex items-center gap-4 p-4 bg-[#2a2a2a] border border-gray-600 rounded-md">
                        <img
                            src={formData.photoUrl || `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234a5568"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"/></svg>`}
                            alt="Pré-visualização"
                            className="w-24 h-24 rounded-md object-cover bg-[#1f1f1f] text-transparent"
                        />
                        <div className="flex-1">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <button
                                type="button"
                                onClick={handleUploadButtonClick}
                                className="py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 text-sm font-semibold"
                            >
                                Carregar Imagem
                            </button>
                            <p className="text-xs text-gray-500 mt-2">
                                PNG ou JPG (Recomendado: 400x500px)
                            </p>
                        </div>
                    </div>
                </div>
                <TextAreaField label="Biografia" id="bio" value={formData.bio} onChange={(e) => handleChange(e)} />
                <InputField label="URL do Vídeo do YouTube (Embed)" id="youtubeUrl" value={formData.youtubeUrl || ''} onChange={(e) => handleChange(e)} />
                <h4 className="text-lg font-semibold text-white pt-2">Estatísticas</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <InputField label="Gols" id="goals" type="number" value={formData.stats.goals} onChange={(e) => handleChange(e)} />
                     <InputField label="Assistências" id="assists" type="number" value={formData.stats.assists} onChange={(e) => handleChange(e)} />
                     <InputField label="Jogos" id="games" type="number" value={formData.stats.games} onChange={(e) => handleChange(e)} />
                </div>
                <TextAreaField label="Conquistas (separadas por vírgula)" id="achievements" value={Array.isArray(formData.achievements) ? formData.achievements.join(', ') : ''} onChange={(e) => setFormData(p => ({ ...p, achievements: e.target.value.split(',').map(s => s.trim()) }))} />
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500">Cancelar</button>
                    <button type="submit" className="py-2 px-4 bg-[#E58A42] text-white font-semibold rounded-md hover:bg-opacity-90">Salvar</button>
                </div>
            </form>
        </Modal>
    );
};

const NewsPage = ({ news, setNews, onAdd, onEdit }: { news: News[], setNews: React.Dispatch<React.SetStateAction<News[]>>, onAdd: () => void, onEdit: (item: News) => void }) => {
    const deleteNews = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
            setNews(currentNews => currentNews.filter(n => n.id !== id));
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Notícias</h2>
                    <p className="text-gray-400 mt-1">Gerencie as notícias do blog</p>
                </div>
                <button onClick={onAdd} className="bg-[#E58A42] text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 hover:bg-opacity-90 transition-all">
                    <PlusIcon className="w-5 h-5" />
                    Nova Notícia
                </button>
            </div>
             <div className="bg-[#1F1F1F] rounded-lg mt-8 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-700">
                        <tr>
                            <th className="p-4 font-semibold">Título</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Data de Criação</th>
                            <th className="p-4 font-semibold">Data de Publicação</th>
                            <th className="p-4 font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.length > 0 ? news.map(item => (
                            <tr key={item.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-800/50">
                                <td className="p-4">{item.title}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-4">{item.createdAt}</td>
                                <td className="p-4">{item.publishedAt}</td>
                                <td className="p-4">
                                    <div className="flex gap-4">
                                        <button onClick={() => onEdit(item)} className="text-gray-400 hover:text-white"><EditIcon className="w-5 h-5"/></button>
                                        <button onClick={() => deleteNews(item.id)} className="text-gray-400 hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                           <tr>
                                <td colSpan={5} className="text-center p-8 text-gray-500">
                                    Nenhuma notícia cadastrada.
                                </td>
                           </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

const NewsFormModal = ({ newsItem, onSave, onClose }: { newsItem: News | null, onSave: (item: News) => void, onClose: () => void }) => {
    const [formData, setFormData] = useState<Omit<News, 'id'>>({
        title: '', status: 'Draft', content: '', createdAt: '', publishedAt: ''
    });

    useEffect(() => {
        if (newsItem) {
            setFormData(newsItem);
        } else {
            const today = new Date().toLocaleDateString('pt-BR');
            setFormData({ title: '', status: 'Draft', content: '', createdAt: today, publishedAt: '' });
        }
    }, [newsItem]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const publishedAt = formData.status === 'Published' && !formData.publishedAt ? new Date().toLocaleDateString('pt-BR') : formData.publishedAt;
        const finalNews = { ...formData, id: newsItem?.id || Date.now(), publishedAt };
        onSave(finalNews);
    };

    return (
        <Modal title={newsItem ? 'Editar Notícia' : 'Nova Notícia'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField label="Título" id="title" value={formData.title} onChange={(e) => handleChange(e)} required />
                {/* FIX: Replaced raw select with SelectField component for consistency. */}
                <SelectField label="Status" id="status" value={formData.status} onChange={handleChange}>
                    <option value="Draft">Rascunho</option>
                    <option value="Published">Publicado</option>
                </SelectField>
                 <TextAreaField label="Conteúdo" id="content" value={formData.content} onChange={(e) => handleChange(e)} required />
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500">Cancelar</button>
                    <button type="submit" className="py-2 px-4 bg-[#E58A42] text-white font-semibold rounded-md hover:bg-opacity-90">Salvar</button>
                </div>
            </form>
        </Modal>
    );
};


const GalleryPage = ({ items, setItems, players, onAdd, onEdit, onDelete, showToast }: { 
    items: GalleryItem[], 
    setItems: React.Dispatch<React.SetStateAction<GalleryItem[]>>,
    players: Player[], 
    onAdd: () => void, 
    onEdit: (item: GalleryItem) => void, 
    onDelete: (id: number) => void,
    showToast: (message: string) => void
}) => {
    const [visibleCount, setVisibleCount] = useState(8);
    const [selectedPlayer, setSelectedPlayer] = useState('all');
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);


    useEffect(() => {
        setVisibleCount(8); // Reset pagination on filter change
    }, [selectedPlayer]);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 8);
    };
    
    const displayItems = useMemo(() => {
        const sorted = [...items]; // Manual sort is now the source of truth
        if (selectedPlayer === 'all') return sorted;
        return sorted.filter(item => item.playerId === parseInt(selectedPlayer, 10));
    }, [items, selectedPlayer]);

    const handleSelect = (id: number) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const isAllSelected = useMemo(() => 
        displayItems.length > 0 && displayItems.every(item => selectedItems.has(item.id)), 
        [displayItems, selectedItems]
    );

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedItems(prev => {
                const newSet = new Set(prev);
                displayItems.forEach(item => newSet.delete(item.id));
                return newSet;
            });
        } else {
            setSelectedItems(prev => {
                const newSet = new Set(prev);
                displayItems.forEach(item => newSet.add(item.id));
                return newSet;
            });
        }
    };
    
    const handleBulkDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir ${selectedItems.size} itens?`)) {
            setItems(prev => prev.filter(item => !selectedItems.has(item.id)));
            showToast(`${selectedItems.size} ${selectedItems.size > 1 ? 'itens excluídos' : 'item excluído'} com sucesso!`);
            setSelectedItems(new Set());
        }
    };
    
    const handleDragSort = () => {
        if (dragItem.current === null || dragOverItem.current === null || dragItem.current === dragOverItem.current) {
            dragItem.current = null;
            dragOverItem.current = null;
            return;
        }

        const newItems = [...items];
        const draggedItemContent = newItems.find(item => item.id === dragItem.current);
        if (!draggedItemContent) return;

        const dragItemIndex = newItems.findIndex(item => item.id === dragItem.current);
        const dragOverItemIndex = newItems.findIndex(item => item.id === dragOverItem.current);
        
        newItems.splice(dragItemIndex, 1);
        newItems.splice(dragOverItemIndex, 0, draggedItemContent);
        
        dragItem.current = null;
        dragOverItem.current = null;
        
        setItems(newItems);
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Galeria</h2>
                    <p className="text-gray-400 mt-1">Gerencie as imagens e vídeos da galeria</p>
                </div>
                {selectedItems.size > 0 ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">{selectedItems.size} selecionado(s)</span>
                        <button onClick={handleBulkDelete} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 hover:bg-red-700 transition-all">
                            <TrashIcon className="w-5 h-5" />
                            Excluir Selecionados
                        </button>
                    </div>
                ) : (
                    <button onClick={onAdd} className="bg-[#E58A42] text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 hover:bg-opacity-90 transition-all">
                        <PlusIcon className="w-5 h-5" />
                        Adicionar Mídia
                    </button>
                )}
            </div>

            <div className="mt-8 flex items-center gap-4">
                <select
                    id="player-filter"
                    name="player-filter"
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                    className="w-full max-w-xs bg-[#2a2a2a] border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-1 focus:ring-[#E58A42] focus:outline-none"
                >
                    <option value="all">Todos os Jogadores</option>
                    {players.map(player => (
                        <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                </select>
                {displayItems.length > 0 && (
                    <button onClick={handleSelectAll} className="text-sm font-semibold text-[#E58A42] hover:text-orange-300">
                        {isAllSelected ? 'Desmarcar Tudo' : 'Selecionar Tudo'}
                    </button>
                )}
            </div>

             {displayItems.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        {displayItems.slice(0, visibleCount).map(item => {
                             const isSelected = selectedItems.has(item.id);
                             return (
                                <div 
                                    key={item.id} 
                                    draggable
                                    onDragStart={() => dragItem.current = item.id}
                                    onDragEnter={() => dragOverItem.current = item.id}
                                    onDragEnd={handleDragSort}
                                    onDragOver={(e) => e.preventDefault()}
                                    className={`relative group bg-[#1F1F1F] rounded-lg overflow-hidden aspect-square transition-all duration-300 cursor-grab active:cursor-grabbing
                                        ${item.featured ? 'ring-2 ring-offset-2 ring-offset-[#181818] ring-[#E58A42]' : ''}
                                        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#181818]' : ''}
                                    `}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleSelect(item.id)}
                                        className="absolute top-2 left-2 z-20 h-5 w-5 rounded border-gray-500 bg-black/50 text-[#E58A42] focus:ring-[#E58A42] focus:ring-offset-0"
                                    />
                                    {item.featured && (
                                        <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full z-10" title="Destaque">
                                            <StarIcon className="w-4 h-4 text-[#FFD700]" />
                                        </div>
                                    )}
                                    <img src={item.url} alt={item.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    {item.type === 'video' && (
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <VideoIcon className="w-12 h-12 text-white/80" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => onEdit(item)} className="p-2 bg-gray-800/80 rounded-full text-gray-300 hover:text-white"><EditIcon className="w-4 h-4"/></button>
                                            <button onClick={() => onDelete(item.id)} className="p-2 bg-gray-800/80 rounded-full text-gray-300 hover:text-red-500"><TrashIcon className="w-4 h-4"/></button>
                                        </div>
                                        <p className="text-white text-sm line-clamp-2">{item.caption}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {visibleCount < displayItems.length && (
                        <div className="text-center mt-8">
                            <button onClick={handleLoadMore} className="bg-[#E58A42] text-white font-semibold py-2 px-6 rounded-md hover:bg-opacity-90 transition-all">
                                Carregar Mais
                            </button>
                        </div>
                    )}
                </>
             ) : (
                <div className="bg-[#1F1F1F] rounded-lg mt-8 flex items-center justify-center h-64">
                    <p className="text-gray-500">{selectedPlayer === 'all' ? 'Nenhuma mídia adicionada à galeria.' : 'Nenhuma mídia encontrada para este jogador.'}</p>
                </div>
             )}
        </div>
    );
};

const MediaFormModal = ({ mediaItem, players, onSave, onClose }: { mediaItem: GalleryItem | null, players: Player[], onSave: (items: GalleryItem[]) => void, onClose: () => void }) => {
    const [formData, setFormData] = useState<Omit<GalleryItem, 'id'>>({
        type: 'image',
        url: '',
        caption: '',
        playerId: players[0]?.id || 0,
        featured: false,
    });
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (mediaItem) {
            setFormData({ ...mediaItem, featured: mediaItem.featured || false });
            setUploadedFiles([]);
        } else {
            setFormData({
                type: 'image',
                url: '',
                caption: '',
                playerId: players[0]?.id || 0,
                featured: false,
            });
            setUploadedFiles([]);
        }
    }, [mediaItem, players]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: name === 'playerId' ? Number(value) : value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const filePromises = Array.from(e.target.files).map(file => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(filePromises).then(base64Files => {
                setUploadedFiles(base64Files);
                if (!mediaItem && base64Files.length > 0) {
                    setFormData(prev => ({ ...prev, url: '' }));
                }
            });
        }
    };
    
    const handleUploadButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.playerId && players.length > 0) {
            alert("Por favor, selecione um jogador.");
            return;
        }

        if (mediaItem) { // Editing
            const newUrl = uploadedFiles.length > 0 ? uploadedFiles[0] : formData.url;
            if (!newUrl) {
                alert("A URL da mídia é obrigatória.");
                return;
            }
            const finalMediaItem = { ...formData, id: mediaItem.id, url: newUrl };
            onSave([finalMediaItem]);
        } else { // Creating
            if (uploadedFiles.length > 0) {
                const newItems: GalleryItem[] = uploadedFiles.map((fileUrl, index) => ({
                    id: Date.now() + index,
                    url: fileUrl,
                    type: formData.type,
                    caption: formData.caption,
                    playerId: formData.playerId,
                    featured: formData.featured,
                }));
                onSave(newItems);
            } else if (formData.url) {
                const newItem: GalleryItem = { ...formData, id: Date.now() };
                onSave([newItem]);
            } else {
                alert("Por favor, adicione uma URL ou carregue um ou mais arquivos.");
            }
        }
    };

    return (
        <Modal title={mediaItem ? 'Editar Mídia' : 'Adicionar Mídia'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    {(mediaItem || uploadedFiles.length === 0) && (
                        <InputField 
                            label="URL da Mídia (Imagem ou Vídeo)" 
                            id="url" 
                            value={formData.url} 
                            onChange={handleChange} 
                            required={!mediaItem && uploadedFiles.length === 0} 
                        />
                    )}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*,video/*"
                        multiple={!mediaItem}
                    />
                    <button 
                        type="button" 
                        onClick={handleUploadButtonClick}
                        className="mt-2 text-sm text-[#E58A42] hover:underline focus:outline-none"
                    >
                        {mediaItem ? "Carregar novo arquivo para substituir" : "Ou carregue um ou mais arquivos do seu dispositivo"}
                    </button>
                    {uploadedFiles.length > 0 && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                {uploadedFiles.length} arquivo(s) para upload
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto bg-[#2a2a2a] border border-gray-600 rounded-md p-2">
                                {uploadedFiles.map((url, index) => (
                                    <img key={index} src={url} alt={`Preview ${index}`} className="w-full h-20 object-cover rounded-md" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <SelectField label="Tipo" id="type" value={formData.type} onChange={(e) => { setFormData(p => ({ ...p, type: e.target.value as 'image' | 'video' })) }}>
                    <option value="image">Imagem</option>
                    <option value="video">Vídeo</option>
                </SelectField>
                <SelectField label="Jogador" id="playerId" value={formData.playerId} onChange={(e) => handleChange(e)} required>
                    <option value="" disabled>Selecione um jogador</option>
                    {players.map(player => (
                        <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                </SelectField>
                <TextAreaField label="Legenda" id="caption" value={formData.caption} onChange={(e) => handleChange(e)} />
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured || false}
                        onChange={(e) => handleChange(e)}
                        className="h-4 w-4 rounded border-gray-600 bg-[#2a2a2a] text-[#E58A42] focus:ring-[#E58A42]"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-400">
                        Destacar mídia na galeria
                    </label>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500">Cancelar</button>
                    <button type="submit" className="py-2 px-4 bg-[#E58A42] text-white font-semibold rounded-md hover:bg-opacity-90">Salvar</button>
                </div>
            </form>
        </Modal>
    );
};

const EmptyPage = ({ title, description }: { title: string, description: string }) => (
    <div>
        <div>
            <h2 className="text-3xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 mt-1">{description}</p>
        </div>
        <div className="bg-[#1F1F1F] rounded-lg mt-8 flex items-center justify-center h-64">
            <p className="text-gray-500">Nenhum item cadastrado.</p>
        </div>
    </div>
);


const SettingsPage = ({ showToast }: { showToast: (message: string) => void }) => {
    const [settings, setSettings] = useState({
        siteTitle: "Marques Player's Agent",
        contactEmail: "contato@example.com",
        contactPhone: "+55 (11) 99999-9999",
        address: "São Paulo, SP",
        facebookUrl: "https://facebook.com/...",
        instagramUrl: "https://instagram.com/...",
        twitterUrl: "https://twitter.com/...",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({...prev, [name]: value}));
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send data to a server
        console.log("Saving settings:", settings);
        showToast("Configurações salvas com sucesso!");
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-white">Configurações Gerais</h2>
            <p className="text-gray-400 mt-1">Configure informações básicas do site</p>
            <form onSubmit={handleSave} className="bg-[#1F1F1F] p-8 rounded-lg mt-8 max-w-3xl space-y-6">
                 <InputField label="Título do Site" id="siteTitle" value={settings.siteTitle} onChange={handleChange} />
                 <InputField label="Email de Contato" id="contactEmail" type="email" value={settings.contactEmail} onChange={handleChange} />
                 <InputField label="Telefone de Contato" id="contactPhone" type="tel" value={settings.contactPhone} onChange={handleChange} />
                 <InputField label="Endereço" id="address" value={settings.address} onChange={handleChange} />
                 <InputField label="Facebook URL" id="facebookUrl" value={settings.facebookUrl} onChange={handleChange} />
                 <InputField label="Instagram URL" id="instagramUrl" value={settings.instagramUrl} onChange={handleChange} />
                 <InputField label="Twitter/X URL" id="twitterUrl" value={settings.twitterUrl} onChange={handleChange} />
                <div>
                    <button type="submit" className="bg-[#E58A42] text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 hover:bg-opacity-90 transition-all">
                        <SaveIcon className="w-5 h-5" />
                        Salvar Configurações
                    </button>
                </div>
            </form>
        </div>
    );
};

const LoginPage = ({ onLogin, onSwitchToPublic }: { onLogin: (e: React.FormEvent) => void, onSwitchToPublic: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#181818]">
            <div className="w-full max-w-md p-8 space-y-8 bg-[#1F1F1F] rounded-lg shadow-lg">
                <div>
                    <h1 className="text-3xl font-bold text-center text-white tracking-wider">marques</h1>
                    <p className="mt-2 text-sm text-center text-gray-400">Painel Administrativo</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onLogin}>
                     <InputField 
                        label="Email" 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <InputField 
                        label="Senha" 
                        id="password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#E58A42] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E58A42] focus:ring-offset-[#1F1F1F]">
                            Entrar
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <button onClick={onSwitchToPublic} className="text-sm text-gray-400 hover:text-white underline">
                        &larr; Voltar ao site
                    </button>
                </div>
            </div>
        </div>
    );
};


const AdminPanel = ({
    players, setPlayers,
    news, setNews,
    gallery, setGallery,
    showToast,
    onLogout
}: {
    players: Player[], setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
    news: News[], setNews: React.Dispatch<React.SetStateAction<News[]>>,
    gallery: GalleryItem[], setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>,
    showToast: (message: string) => void,
    onLogout: () => void
}) => {
    const [activePage, setActivePage] = useState<Page>('dashboard');
    
    // Modal State
    const [isPlayerModalOpen, setPlayerModalOpen] = useState(false);
    const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
    const [isNewsModalOpen, setNewsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [isMediaModalOpen, setMediaModalOpen] = useState(false);
    const [editingMedia, setEditingMedia] = useState<GalleryItem | null>(null);

    const handleSavePlayer = (player: Player) => {
        if (editingPlayer) {
            setPlayers(players.map(p => p.id === player.id ? player : p));
            showToast("Jogador atualizado com sucesso!");
        } else {
            setPlayers([...players, player]);
            showToast("Jogador adicionado com sucesso!");
        }
        setPlayerModalOpen(false);
        setEditingPlayer(null);
    };

    const handleSaveNews = (newsItem: News) => {
        if (editingNews) {
            setNews(news.map(n => n.id === newsItem.id ? newsItem : n));
            showToast("Notícia atualizada com sucesso!");
        } else {
            setNews([...news, newsItem]);
            showToast("Notícia criada com sucesso!");
        }
        setNewsModalOpen(false);
        setEditingNews(null);
    }

    const handleSaveMedia = (mediaItems: GalleryItem[]) => {
        if (editingMedia && mediaItems.length === 1) {
            const updatedItem = mediaItems[0];
            setGallery(gallery.map(g => g.id === updatedItem.id ? updatedItem : g));
            showToast("Mídia atualizada com sucesso!");
        } else {
            setGallery(prev => [...prev, ...mediaItems]);
            const message = mediaItems.length > 1
                ? `${mediaItems.length} mídias adicionadas com sucesso!`
                : "Mídia adicionada com sucesso!";
            showToast(message);
        }
        setMediaModalOpen(false);
        setEditingMedia(null);
    };

    const handleDeleteMedia = (id: number) => {
        if(window.confirm('Tem certeza que deseja excluir esta mídia?')) {
            setGallery(gallery.filter(g => g.id !== id));
            showToast("Mídia excluída com sucesso!");
        }
    }

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <Dashboard playerCount={players.length} newsCount={news.length} galleryCount={gallery.length} />;
            case 'players':
                return <PlayersPage 
                    players={players} 
                    setPlayers={setPlayers}
                    onAdd={() => { setEditingPlayer(null); setPlayerModalOpen(true); }}
                    onEdit={(player) => { setEditingPlayer(player); setPlayerModalOpen(true); }}
                />;
            case 'content':
                return <EmptyPage title="Conteúdo" description="Gerencie o conteúdo do site" />;
            case 'gallery':
                return <GalleryPage 
                    items={gallery} 
                    setItems={setGallery}
                    players={players}
                    onAdd={() => { setEditingMedia(null); setMediaModalOpen(true); }}
                    onEdit={(item) => { setEditingMedia(item); setMediaModalOpen(true); }}
                    onDelete={handleDeleteMedia}
                    showToast={showToast}
                />;
            case 'news':
                return <NewsPage 
                    news={news} 
                    setNews={setNews}
                    onAdd={() => { setEditingNews(null); setNewsModalOpen(true); }}
                    onEdit={(item) => { setEditingNews(item); setNewsModalOpen(true); }}
                />;
            case 'settings':
                return <SettingsPage showToast={showToast} />;
            default:
                return <Dashboard playerCount={players.length} newsCount={news.length} galleryCount={gallery.length} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#181818] text-gray-300 flex">
            <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />
            <main className="flex-1 ml-64 p-8">
                {renderContent()}
            </main>
            {isPlayerModalOpen && <PlayerFormModal player={editingPlayer} onSave={handleSavePlayer} onClose={() => setPlayerModalOpen(false)} />}
            {isNewsModalOpen && <NewsFormModal newsItem={editingNews} onSave={handleSaveNews} onClose={() => setNewsModalOpen(false)} />}
            {isMediaModalOpen && <MediaFormModal mediaItem={editingMedia} players={players} onSave={handleSaveMedia} onClose={() => setMediaModalOpen(false)} />}
        </div>
    );
};


export default function App() {
    const [view, setView] = useState<'public' | 'admin'>('public');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Shared data state
    const [players, setPlayers] = useState<Player[]>(initialPlayers);
    const [news, setNews] = useState<News[]>(initialNews);
    const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
    const [videos, setVideos] = useState<Video[]>(initialVideos);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [scrollToSection, setScrollToSection] = useState<string | null>(null);
    
    // Toast State
    const [toast, setToast] = useState({ show: false, message: '' });
    const showToast = (message: string) => setToast({ show: true, message });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple simulation: any non-empty login attempt is successful
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        if (email && password) {
            setIsAuthenticated(true);
            showToast("Login bem-sucedido!");
        } else {
            alert("Por favor, preencha o email e a senha.");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        showToast("Você saiu com sucesso!");
    };

    const handleSwitchToAdmin = () => {
        setSelectedPlayer(null);
        setView('admin');
    }
    
    const handleSwitchToPublic = () => {
        setView('public');
    }

    const handleSelectPlayer = (player: Player) => {
        setSelectedPlayer(player);
    };

    const handleDeselectPlayer = (hash?: string) => {
        setSelectedPlayer(null);
        if (hash) {
            setScrollToSection(hash);
        }
    };

    if (view === 'public') {
        if (selectedPlayer) {
            const playerGallery = gallery.filter(
                (item) => item.playerId === selectedPlayer.id && item.type === 'image'
            );
            return <PlayerDetailPage 
                player={selectedPlayer} 
                playerGallery={playerGallery}
                onBack={handleDeselectPlayer} 
                onSwitchToAdmin={handleSwitchToAdmin}
            />
        }
        return <PublicWebsite 
            players={players} 
            news={news.filter(n => n.status === 'Published')}
            gallery={gallery}
            onSwitchToAdmin={handleSwitchToAdmin} 
            onSelectPlayer={handleSelectPlayer}
            scrollToSection={scrollToSection}
            onScrollComplete={() => setScrollToSection(null)}
        />
    }

    // Admin View
    if (!isAuthenticated) {
        return (
            <>
                <LoginPage onLogin={handleLogin} onSwitchToPublic={handleSwitchToPublic} />
                <Toast message={toast.message} show={toast.show} onHide={() => setToast({ show: false, message: '' })} />
            </>
        );
    }

    return (
        <>
            <AdminPanel
                players={players} setPlayers={setPlayers}
                news={news} setNews={setNews}
                gallery={gallery} setGallery={setGallery}
                showToast={showToast}
                onLogout={handleLogout}
            />
            <Toast message={toast.message} show={toast.show} onHide={() => setToast({ show: false, message: '' })} />
        </>
    );
}