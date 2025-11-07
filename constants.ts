
import React from 'react';

export interface Player {
  id: number;
  name: string;
  photoUrl: string;
  position: string;
  nationality: string;
  age: number;
  club: string;
  bio: string;
  stats: {
    goals: number;
    assists: number;
    games: number;
  };
  achievements: string[];
  youtubeUrl?: string;
}

export const players: Player[] = [
  {
    id: 1,
    name: "Matheus Lima",
    photoUrl: "https://images.pexels.com/photos/4065893/pexels-photo-4065893.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Atacante",
    nationality: "Brasil",
    age: 25,
    club: "Saitos FC",
    bio: "Matheus é um atacante veloz e habilidoso, conhecido por sua capacidade de finalização e dribles desconcertantes. Com uma forte presença na área, ele é uma ameaça constante para qualquer defesa.",
    stats: { goals: 22, assists: 10, games: 35 },
    achievements: ["Artilheiro do Campeonato Nacional", "Melhor Atacante da Liga"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    photoUrl: "https://images.pexels.com/photos/10113333/pexels-photo-10113333.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Meio campo",
    nationality: "Argentina",
    age: 25,
    club: "Boca Juniors",
    bio: "Meio-campista completo com excelente visão de jogo e passes precisos. Carlos controla o ritmo da partida e é especialista em bolas paradas, criando inúmeras oportunidades para seus companheiros.",
    stats: { goals: 8, assists: 12, games: 32 },
    achievements: ["Campeão da Copa Libertadores", "Melhor Jogador Jovem da Argentina"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 3,
    name: "Júlio Silva",
    photoUrl: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Zagueiro",
    nationality: "Brasil",
    age: 27,
    club: "SC Braga",
    bio: "Um zagueiro robusto e líder nato. Júlio combina força física com inteligência tática, sendo impecável no jogo aéreo e nos desarmes. Sua liderança em campo é um pilar para a equipe.",
    stats: { goals: 3, assists: 1, games: 38 },
    achievements: ["Melhor Defensor da Liga Portuguesa", "Campeão da Taça de Portugal"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 4,
    name: "Miguel Torres",
    photoUrl: "https://images.pexels.com/photos/1233414/pexels-photo-1233414.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Goleiro",
    nationality: "Espanha",
    age: 24,
    club: "Real Madrid",
    bio: "Miguel é um goleiro ágil com reflexos incríveis. Sua segurança debaixo das traves e habilidade em defender pênaltis já salvaram sua equipe em momentos decisivos. Considerado uma das maiores promessas da sua geração.",
    stats: { goals: 0, assists: 0, games: 38 },
    achievements: ["Luva de Ouro do Campeonato", "Revelação da Temporada"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 5,
    name: "Lucas Santos",
    photoUrl: "https://images.pexels.com/photos/8982398/pexels-photo-8982398.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Lateral",
    nationality: "Brasil",
    age: 20,
    club: "Flamengo",
    bio: "Jovem lateral com grande potencial ofensivo e defensivo. Rápido e com bom cruzamento, Lucas é uma peça importante para a construção de jogadas pelas laterais.",
    stats: { goals: 2, assists: 8, games: 30 },
    achievements: ["Revelação do Campeonato Estadual"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 6,
    name: "Diego Fernandez",
    photoUrl: "https://images.pexels.com/photos/10113333/pexels-photo-10113333.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Atacante",
    nationality: "Uruguai",
    age: 26,
    club: "Peñarol",
    bio: "Atacante de força e presença de área. Diego é um finalizador nato, com faro de gol e excelente posicionamento, sendo uma referência no ataque de sua equipe.",
    stats: { goals: 18, assists: 5, games: 33 },
    achievements: ["Artilheiro da Copa Nacional"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 7,
    name: "Rafael Costa",
    photoUrl: "https://images.pexels.com/photos/7991496/pexels-photo-7991496.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Meio campo",
    nationality: "Brasil",
    age: 21,
    club: "Palmeiras",
    bio: "Meio-campista versátil, capaz de atuar tanto na contenção quanto na criação de jogadas. Rafael possui um passe refinado e grande inteligência tática.",
    stats: { goals: 5, assists: 9, games: 36 },
    achievements: ["Melhor Meio-campista Jovem"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 8,
    name: "Antonio Morales",
    photoUrl: "https://images.pexels.com/photos/13687352/pexels-photo-13687352.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Zagueiro",
    nationality: "México",
    age: 28,
    club: "Club América",
    bio: "Zagueiro experiente e seguro, com ótimo senso de antecipação. Antonio é um líder na defesa, organizando a linha defensiva e transmitindo confiança para o time.",
    stats: { goals: 4, assists: 2, games: 37 },
    achievements: ["Defensor do Ano"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 9,
    name: "Santiago Gómez",
    photoUrl: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Atacante",
    nationality: "Argentina",
    age: 22,
    club: "River Plate",
    bio: "Jovem promessa do futebol argentino, Santiago é um atacante rápido e com excelente finalização de média distância.",
    stats: { goals: 15, assists: 7, games: 28 },
    achievements: ["Campeão Argentino Sub-23"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 10,
    name: "Felipe Alves",
    photoUrl: "https://images.pexels.com/photos/13562734/pexels-photo-13562734.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Volante",
    nationality: "Brasil",
    age: 29,
    club: "Corinthians",
    bio: "Volante experiente com grande poder de marcação e desarme. Felipe é o cão de guarda do meio-campo, protegendo a defesa com vigor.",
    stats: { goals: 1, assists: 3, games: 39 },
    achievements: ["Melhor Volante do Brasileirão"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 11,
    name: "Javier Vargas",
    photoUrl: "https://images.pexels.com/photos/1572044/pexels-photo-1572044.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Meia Atacante",
    nationality: "Espanha",
    age: 23,
    club: "Valencia CF",
    bio: "Meia criativo com dribles curtos e passes decisivos. Javier é o cérebro da equipe, capaz de quebrar linhas defensivas com sua visão de jogo.",
    stats: { goals: 10, assists: 15, games: 34 },
    achievements: ["Revelação da La Liga"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 12,
    name: "Bruno Henrique",
    photoUrl: "https://images.pexels.com/photos/6740324/pexels-photo-6740324.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Ponta Esquerda",
    nationality: "Brasil",
    age: 24,
    club: "Santos FC",
    bio: "Ponta extremamente veloz e habilidoso, Bruno aterroriza as defesas adversárias com seus cortes para dentro e chutes potentes.",
    stats: { goals: 14, assists: 9, games: 36 },
    achievements: ["Rei da América"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 13,
    name: "Mateo Castillo",
    photoUrl: "https://images.pexels.com/photos/9745170/pexels-photo-9745170.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Zagueiro",
    nationality: "Argentina",
    age: 26,
    club: "Independiente",
    bio: "Zagueiro técnico com excelente saída de bola. Mateo é fundamental na construção do jogo desde a defesa.",
    stats: { goals: 5, assists: 2, games: 35 },
    achievements: ["Campeão da Copa Sul-Americana"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 14,
    name: "Thiago Mendes",
    photoUrl: "https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Goleiro",
    nationality: "Brasil",
    age: 28,
    club: "Atlético Mineiro",
    bio: "Goleiro seguro e com grande envergadura. Thiago se destaca pela liderança e defesas em momentos cruciais.",
    stats: { goals: 0, assists: 0, games: 40 },
    achievements: ["Goleiro Menos Vazado"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 15,
    name: "Esteban Ramírez",
    photoUrl: "https://images.pexels.com/photos/11713501/pexels-photo-11713501.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Lateral Direito",
    nationality: "Uruguai",
    age: 27,
    club: "Nacional",
    bio: "Lateral forte e incansável, com grande capacidade de apoio ao ataque e solidez defensiva.",
    stats: { goals: 4, assists: 10, games: 38 },
    achievements: ["Melhor Lateral do Campeonato Uruguaio"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 16,
    name: "Guilherme Paiva",
    photoUrl: "https://images.pexels.com/photos/945463/pexels-photo-945463.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Atacante",
    nationality: "Brasil",
    age: 19,
    club: "São Paulo FC",
    bio: "Jovem centroavante com faro de gol apurado. Apesar da pouca idade, mostra frieza e oportunismo dentro da área.",
    stats: { goals: 12, assists: 3, games: 25 },
    achievements: ["Artilheiro do Mundial Sub-20"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
   {
    id: 17,
    name: "Nicolás Herrera",
    photoUrl: "https://images.pexels.com/photos/1083556/pexels-photo-1083556.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Meio-campo",
    nationality: "Argentina",
    age: 28,
    club: "Racing Club",
    bio: "Maestro do meio-campo, com passes longos precisos e controle de bola excepcional.",
    stats: { goals: 7, assists: 18, games: 37 },
    achievements: ["Líder de Assistências da Liga"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 18,
    name: "Davi Luiz",
    photoUrl: "https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Zagueiro",
    nationality: "Brasil",
    age: 30,
    club: "Fluminense",
    bio: "Zagueiro experiente e imponente no jogo aéreo, tanto defensivo quanto ofensivo.",
    stats: { goals: 6, assists: 1, games: 38 },
    achievements: ["Campeão da Recopa"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 19,
    name: "Rodrigo Vega",
    photoUrl: "https://images.pexels.com/photos/13687342/pexels-photo-13687342.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Ponta Direita",
    nationality: "México",
    age: 25,
    club: "Tigres UANL",
    bio: "Ponta veloz que se destaca pelos dribles em velocidade e cruzamentos precisos para a área.",
    stats: { goals: 9, assists: 14, games: 35 },
    achievements: ["Campeão da CONCACAF Champions League"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  },
  {
    id: 20,
    name: "Leonardo Barros",
    photoUrl: "https://images.pexels.com/photos/1083554/pexels-photo-1083554.jpeg?auto=compress&cs=tinysrgb&w=800",
    position: "Atacante",
    nationality: "Brasil",
    age: 26,
    club: "Internacional",
    bio: "Atacante versátil que pode jogar como centroavante ou pelos lados, combinando força e técnica.",
    stats: { goals: 17, assists: 8, games: 34 },
    achievements: ["Craque do Gauchão"],
    youtubeUrl: "https://www.youtube.com/embed/G5q2yQ122wM"
  }
];

export interface News {
  id: number;
  title: string;
  status: 'Draft' | 'Published';
  content: string;
  createdAt: string;
  publishedAt: string | null;
}

export const news: News[] = [
    {
        id: 1,
        title: "Matheus Lima brilha em vitória e se isola na artilharia",
        status: 'Published',
        content: "Com uma atuação de gala, Matheus Lima marcou dois gols e deu uma assistência na vitória do Saitos FC por 3 a 0. O atacante brasileiro chegou a 22 gols na temporada e se tornou o artilheiro isolado da competição, consolidando sua posição como um dos jogadores mais decisivos do campeonato.",
        createdAt: "15/05/2024",
        publishedAt: "15/05/2024"
    },
    {
        id: 2,
        title: "Interesse europeu por Carlos Rodriguez aumenta após exibições",
        status: 'Published',
        content: "O meio-campista argentino Carlos Rodriguez tem sido o destaque do Boca Juniors na Libertadores, e suas performances não passaram despercebidas. Clubes da Espanha e Itália já monitoram o jogador de perto, e uma proposta oficial pode chegar na próxima janela de transferências. O clube argentino, no entanto, afirma que não pretende liberá-lo facilmente.",
        createdAt: "12/05/2024",
        publishedAt: "12/05/2024"
    },
    {
        id: 3,
        title: "Contrato de João Silva a ser renovado em breve",
        status: 'Draft',
        content: "Fontes próximas ao SC Braga indicam que a renovação de contrato do zagueiro João Silva está bem encaminhada. O jogador, que é peça fundamental na defesa da equipe, deve assinar um novo vínculo por mais três temporadas. A torcida comemora a permanência do seu capitão.",
        createdAt: "10/05/2024",
        publishedAt: null
    }
];

export interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  caption: string;
  playerId: number;
  featured?: boolean;
}

export const gallery: GalleryItem[] = [
  { id: 1, type: 'image', url: 'https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Treino intenso de finalização.', playerId: 1, featured: true },
  { id: 2, type: 'image', url: 'https://images.pexels.com/photos/949556/pexels-photo-949556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Comemorando gol da vitória.', playerId: 2, featured: false },
  { id: 3, type: 'video', url: 'https://images.pexels.com/photos/1908821/pexels-photo-1908821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Melhores momentos da partida.', playerId: 3, featured: false },
  { id: 4, type: 'image', url: 'https://images.pexels.com/photos/2701579/pexels-photo-2701579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Defesa espetacular no último minuto.', playerId: 4, featured: true },
  { id: 5, type: 'image', url: 'https://images.pexels.com/photos/2297961/pexels-photo-2297961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Foco total antes do jogo.', playerId: 1, featured: false },
  { id: 6, type: 'image', url: 'https://images.pexels.com/photos/2413089/pexels-photo-2413089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Entrevista coletiva pós-jogo.', playerId: 2, featured: false },
  { id: 7, type: 'image', url: 'https://images.pexels.com/photos/209956/pexels-photo-209956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Sessão de autógrafos com os fãs.', playerId: 3, featured: false },
  { id: 8, type: 'image', url: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Trabalho tático com a equipe.', playerId: 4, featured: false },
  { id: 9, type: 'video', url: 'https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Bastidores da viagem para o jogo.', playerId: 1, featured: false },
  { id: 10, type: 'image', url: 'https://images.pexels.com/photos/159556/football-player-game-competition-159556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', caption: 'Disputa de bola no meio-campo.', playerId: 2, featured: false },
  { id: 11, type: 'image', url: 'https://images.pexels.com/photos/8982398/pexels-photo-8982398.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Lucas Santos em ação pelo Flamengo.', playerId: 5, featured: true },
  { id: 12, type: 'image', url: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Treino de velocidade no Ninho do Urubu.', playerId: 5 },
  { id: 13, type: 'image', url: 'https://images.pexels.com/photos/13562734/pexels-photo-13562734.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Comemorando título estadual.', playerId: 5 },
  { id: 14, type: 'image', url: 'https://images.pexels.com/photos/10113333/pexels-photo-10113333.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Diego Fernandez com a camisa do Peñarol.', playerId: 6, featured: false },
  { id: 15, type: 'image', url: 'https://images.pexels.com/photos/7991496/pexels-photo-7991496.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Artilheiro do campeonato uruguaio.', playerId: 6 },
  { id: 16, type: 'image', url: 'https://images.pexels.com/photos/13687352/pexels-photo-13687352.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Finalização precisa para o gol.', playerId: 6 },
  { id: 17, type: 'image', url: 'https://images.pexels.com/photos/1572044/pexels-photo-1572044.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Javier Vargas em campo pelo Valencia.', playerId: 11, featured: true },
  { id: 18, type: 'image', url: 'https://images.pexels.com/photos/6740324/pexels-photo-6740324.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Drible desconcertante de Bruno Henrique.', playerId: 12 },
  { id: 19, type: 'image', url: 'https://images.pexels.com/photos/9745170/pexels-photo-9745170.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Mateo Castillo, pilar da defesa do Independiente.', playerId: 13 },
  { id: 20, type: 'image', url: 'https://images.pexels.com/photos/2880507/pexels-photo-2880507.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Thiago Mendes, segurança no gol do Galo.', playerId: 14, featured: true },
  { id: 21, type: 'image', url: 'https://images.pexels.com/photos/11713501/pexels-photo-11713501.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Esteban Ramírez avança pela lateral.', playerId: 15 },
  { id: 22, type: 'image', url: 'https://images.pexels.com/photos/945463/pexels-photo-945463.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Guilherme Paiva, a promessa do São Paulo.', playerId: 16 },
  { id: 23, type: 'image', url: 'https://images.pexels.com/photos/1083556/pexels-photo-1083556.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Nicolás Herrera distribuindo o jogo.', playerId: 17 },
  { id: 24, type: 'image', url: 'https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Davi Luiz, xerife da zaga tricolor.', playerId: 18 },
  { id: 25, type: 'image', url: 'https://images.pexels.com/photos/13687342/pexels-photo-13687342.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Rodrigo Vega em alta velocidade.', playerId: 19 },
  { id: 26, type: 'image', url: 'https://images.pexels.com/photos/1083554/pexels-photo-1083554.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Leonardo Barros, matador do Inter.', playerId: 20, featured: true },
  { id: 27, type: 'image', url: 'https://images.pexels.com/photos/4065893/pexels-photo-4065893.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Sessão de fotos oficial.', playerId: 1 },
  { id: 28, type: 'image', url: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Capitão da equipe.', playerId: 3 },
  { id: 29, type: 'image', url: 'https://images.pexels.com/photos/1233414/pexels-photo-1233414.jpeg?auto=compress&cs=tinysrgb&w=800', caption: 'Treino de goleiros.', playerId: 4 }
];

export interface SocialLink {
    name: string;
    url: string;
    icon: React.FC<{className?: string}>;
}

export interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string; // Embed URL
  playerId?: number;
}

export const videos: Video[] = [
  {
    id: 1,
    title: "Melhores Momentos: Matheus Lima",
    thumbnailUrl: "https://images.pexels.com/photos/8982367/pexels-photo-8982367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    playerId: 1
  },
  {
    id: 2,
    title: "Entrevista Exclusiva: Carlos Rodriguez",
    thumbnailUrl: "https://images.pexels.com/photos/7188046/pexels-photo-7188046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    playerId: 2
  },
  {
    id: 3,
    title: "Bastidores do Treino da Equipe",
    thumbnailUrl: "https://images.pexels.com/photos/6974971/pexels-photo-6974971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
   {
    id: 4,
    title: "Defesas Incríveis de Miguel Torres",
    thumbnailUrl: "https://images.pexels.com/photos/4679720/pexels-photo-4679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    playerId: 4
  }
];
