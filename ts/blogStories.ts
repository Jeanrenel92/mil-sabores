import type { BlogPost, BlogStory } from '../types/blog'

export const featuredPost: BlogPost = {
  id: 'destacada',
  image: '/images/picture/portal_blog.png',
  imageAlt: 'Torta decorada de 1000 Sabores',
  category: 'HISTORIA DESTACADA',
  title: 'El arte detrás de una torta perfecta',
  excerpt:
    'Cada torta tiene una historia. Desde la selección de los ingredientes hasta el último detalle de su decoración, descubrimos qué hay detrás de una creación de 1000 Sabores.',
}

export const blogPosts: BlogPost[] = [
  {
    id: 'origen',
    image: '/images/picture/historia._blog.png',
    imageAlt: 'Pastelería 1000 Sabores',
    category: 'NUESTRA HISTORIA',
    title: 'De una pequeña idea a 1000 Sabores',
    excerpt:
      'Conoce cómo nació nuestra pasión por la pastelería y cómo una pequeña idea se transformó en un lugar lleno de sabores.',
  },
  {
    id: 'cocina',
    image: '/images/picture/historia1.png',
    imageAlt: 'Preparación de productos de pastelería',
    category: 'DETRÁS DE 1000 SABORES',
    title: 'Un día dentro de nuestra cocina',
    excerpt:
      'Desde las primeras preparaciones de la mañana hasta la decoración de nuestros productos, descubre cómo trabajamos.',
  },
  {
    id: 'equipo',
    image: '/images/picture/equipo.png',
    imageAlt: 'Equipo de 1000 Sabores',
    category: 'NUESTRO EQUIPO',
    title: 'Las personas detrás de cada creación',
    excerpt:
      'Conoce a quienes ponen dedicación, creatividad y cariño en cada producto que llega a nuestros clientes.',
  },
]

export const blogStories: BlogStory[] = [
  {
    id: 'destacada',
    image: '/images/picture/portal_blog.png',
    category: 'HISTORIA DESTACADA',
    title: 'El arte detrás de una torta perfecta',
    paragraphs: [
      'En 1000 Sabores creemos que una torta es mucho más que un postre. Detrás de cada creación existe una historia, un momento especial y muchas horas de dedicación.',
      'Todo comienza con la selección de los ingredientes. Elegimos cuidadosamente cada producto para conseguir el equilibrio entre sabor, textura y calidad que buscamos en nuestras preparaciones.',
      'Después comienza la elaboración. Cada bizcocho se prepara con paciencia, respetando los tiempos de mezcla y horneado para conseguir una textura suave y esponjosa.',
      'Una vez que las distintas preparaciones están listas, comienza uno de nuestros momentos favoritos: la decoración.',
      'Nuestro equipo trabaja cada detalle de forma cuidadosa. Los colores, las formas, las frutas, el chocolate y cada elemento decorativo se combinan para crear una torta que no solamente sea deliciosa, sino también especial para quien la recibe.',
      'Pero quizás la parte más importante ocurre cuando la torta sale de nuestra cocina y llega a una celebración.',
      'Un cumpleaños, un aniversario, una reunión familiar o simplemente un momento para compartir pueden convertirse en recuerdos que perduran durante mucho tiempo.',
      'Por eso, detrás de cada torta de 1000 Sabores existe mucho más que una receta. Existe dedicación, creatividad y el deseo de hacer que cada celebración tenga un sabor especial.',
      'Ese es el verdadero arte detrás de una torta perfecta.',
    ],
  },
  {
    id: 'origen',
    image: '/images/picture/historia._blog.png',
    category: 'NUESTRA HISTORIA',
    title: 'De una pequeña idea a 1000 Sabores',
    paragraphs: [
      'Todo comenzó con una pequeña idea y una gran pasión por la pastelería.',
      '1000 Sabores nació con el deseo de crear productos que no solamente fueran deliciosos, sino que también pudieran formar parte de los momentos más importantes de nuestros clientes.',
      'Al principio todo era mucho más pequeño. Cada preparación se realizaba con dedicación y cada nuevo pedido representaba una oportunidad para aprender y mejorar.',
      'Con el tiempo, la pasión y el esfuerzo fueron haciendo crecer el proyecto.',
      'Nuevas recetas, nuevos sabores y nuevas ideas comenzaron a formar parte de nuestra pastelería.',
      'Lo que comenzó como una pequeña idea se transformó poco a poco en 1000 Sabores, un espacio donde buscamos combinar creatividad, calidad y dedicación en cada creación.',
      'Nuestra historia continúa creciendo junto a cada persona que elige compartir uno de nuestros productos en sus momentos especiales.',
    ],
  },
  {
    id: 'cocina',
    image: '/images/picture/historia1.png',
    category: 'DETRÁS DE 1000 SABORES',
    title: 'Un día dentro de nuestra cocina',
    paragraphs: [
      'Nuestro día comienza mucho antes de que nuestros clientes reciban sus productos.',
      'Desde las primeras horas de la mañana comenzamos a preparar los ingredientes y organizar cada una de las tareas necesarias para la jornada.',
      'Cada preparación requiere atención y cuidado.',
      'Mientras algunos integrantes del equipo trabajan en las masas y rellenos, otros comienzan con las decoraciones y los detalles que harán que cada producto sea especial.',
      'La organización es fundamental. Cada pedido tiene sus propios tiempos de preparación y debemos asegurarnos de que todo esté listo en el momento adecuado.',
      'Uno de los momentos más entretenidos llega cuando comienza la decoración.',
      'Es ahí donde cada integrante puede aportar creatividad y convertir una preparación en una creación única.',
      'Al finalizar la jornada revisamos cada pedido antes de que salga de nuestra cocina.',
      'Nuestro objetivo es que cada producto llegue a nuestros clientes con el mismo cuidado con el que fue preparado.',
    ],
  },
  {
    id: 'equipo',
    image: '/images/picture/equipo.png',
    category: 'NUESTRO EQUIPO',
    title: 'Las personas detrás de cada creación',
    paragraphs: [
      'Detrás de cada producto de 1000 Sabores existe un equipo de personas que comparte una misma pasión: crear momentos especiales a través de la pastelería.',
      'Cada integrante cumple un papel importante dentro del proceso.',
      'Algunas personas se encargan de las preparaciones, otras de las decoraciones y otras de organizar los pedidos y atender a nuestros clientes.',
      'Aunque cada tarea es diferente, todas tienen algo en común: dedicación y atención a los detalles.',
      'Trabajar en equipo nos permite compartir ideas, aprender de los demás y encontrar nuevas formas de mejorar nuestras creaciones.',
      'Para nosotros, una buena pastelería no solamente depende de los ingredientes o de las recetas.',
      'También depende de las personas que ponen esfuerzo, creatividad y cariño en cada preparación.',
      'Ese trabajo conjunto es parte fundamental de lo que somos como 1000 Sabores.',
    ],
  },
]
