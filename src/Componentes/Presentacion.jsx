import React, { useState, useEffect } from 'react';
// Importa los estilos
import '../Estilos/Presentacion.css';
// Importa las funciones y referencias de Firebase
import { db, storage, ref as dbRef, onValue } from '../firebase'; 
import { ref as storageRef, getDownloadURL } from "firebase/storage";

// --- Componentes de Iconos ---

/**
 * Icono de Menú (Hamburguesa) para la navegación móvil.
 */
const MenuIcon = () => (
  <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
  </svg>
);

/**
 * Icono de Flecha Externa para enlaces.
 */
const ExternalLinkIcon = () => (
  <span className="external-link-icon">
    &#x2197; {/* Flecha hacia arriba a la derecha */}
  </span>
);

// --- Componentes de Sección de Página ---

/**
 * Componente Header
 * Muestra la barra de navegación principal con enlaces a las secciones.
 */
const Header = () => {
  return (
    <header className="portfolio-header">
      <nav className="container nav-container">
        <a href="#" className="nav-logo">
          Ing Mario Márquez S.
        </a>
        {/* Menú para escritorio */}
        <div className="nav-menu-desktop">
          <a href="#inicio" className="nav-link">Inicio</a>
          <a href="#sobre-mi" className="nav-link">Sobre Mí</a> 
          <a href="#experiencia" className="nav-link">Experiencia</a>
          <a href="#proyectos" className="nav-link">Proyectos</a>
          <a href="#contacto" className="nav-link">Contacto</a>
        </div>
        {/* Menú móvil */}
        <div className="nav-menu-mobile">
          <MenuIcon />
        </div>
      </nav>
    </header>
  );
};

/**
 * Componente Hero (Sección de Inicio)
 * Muestra el título principal, foto de perfil y botones de acción.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.photoURL - URL de la foto de perfil (obtenida del componente padre).
 */
const Hero = () => {
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-content">
        <span className="hero-subtitle">Ingeniero de Sistemas y Administrador</span>
      

        <h1 className="hero-title">
          Mario Alberto Márquez Santiago
        </h1>
        <p className="hero-description">
          Ingeniero de aplicaciones con más de 3 años de experiencia en el sector salud, especializado en el soporte, desarrollo y operación de sistemas críticos. Busco un rol desafiante donde pueda aplicar mis habilidades técnicas para construir software innovador y de alto impacto.
        </p>
        <div className="hero-buttons">
          <a href="#contacto" className="btn btn-primary">
            Contáctame
          </a>
          <a href="https://github.com/zosen1992" target="_blank" rel="noopener noreferrer" className="btn btn-secondary group">
            Ver GitHub <ExternalLinkIcon />
          </a>
        </div>
      </div>
    </section>
  );
};

/**
 * Componente SobreMi
 * Muestra una descripción textual de Firebase y la foto de perfil.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.photoURL - URL de la foto de perfil (obtenida del componente padre).
 */
const SobreMi = ({ photoURL }) => {
  const [sobreMiText, setSobreMiText] = useState('');
  // Efecto para cargar el texto "Sobre Mí" desde Firebase
  useEffect(() => {
    const sobreMiRef = dbRef(db, 'MarquezInfo/Datos/SobreMi');
    
    const unsubscribe = onValue(sobreMiRef, (snapshot) => {
      const text = snapshot.val();
      if (text) {
        setSobreMiText(text);
      }
      console.log(photoURL)
    });

    // Limpieza del listener al desmontar
    return () => unsubscribe();
  }, []); // El array vacío asegura que se ejecute solo al montar

  return (
    <section id="sobre-mi" className="sobre-mi-section">
      {/* Columna de Texto */}
      <div className="sobre-mi-content">
        <h2 className="section-title">Sobre Mí</h2>
        {/* La clase CSS 'sobre-mi-text' debería tener 'white-space: pre-line' 
          para respetar los saltos de línea del string de Firebase.
        */}
        <p className="sobre-mi-text">
          {sobreMiText || 'Cargando...'}
        </p>
      </div>

      {/* Columna de Imagen */}
      <div className="sobre-mi-image-container">
        <div className="sobre-mi-photo-ring"></div>
        {/* Muestra la foto de perfil si la URL está disponible */}
        {photoURL && (
          <img 
            src={photoURL} 
            alt="Foto de perfil" 
            className="sobre-mi-photo"
          />
        )}
      </div>
    </section>
  );
};

/**
 * Componente Skills
 * Muestra una cuadrícula de tecnologías principales obtenidas de Firebase.
 */
const Skills = () => {
  const [skills, setSkills] = useState([]);

  // Efecto para cargar las tecnologías desde Firebase
  useEffect(() => {
    const skillsRef = dbRef(db, 'MarquezInfo/Tecnologias');

    const unsubscribe = onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convierte el objeto de Firebase en un array de valores
        const skillsArray = Object.values(data);
        setSkills(skillsArray);
      } else {
        setSkills([]);
      }
    });

    // Limpieza del listener
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">
        Tecnologías Principales
      </h2>
      <div className="skills-grid">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))
        ) : (
          <p style={{ color: '#94a3b8' }}>Cargando tecnologías...</p>
        )}
      </div>
    </section>
  );
};

/**
 * Componente Experience
 * Muestra la experiencia laboral en formato de línea de tiempo desde Firebase.
 */
const Experience = () => {
  const [experienceList, setExperienceList] = useState([]);

  // Efecto para cargar la experiencia desde Firebase
  useEffect(() => {
    const experienceRef = dbRef(db, 'MarquezInfo/Experiencia');
    const unsubscribe = onValue(experienceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convierte el objeto de Firebase en un array
        const loadedExperience = Object.values(data);
        setExperienceList(loadedExperience);
      } else {
        setExperienceList([]);
      }
    });

    // Limpieza
    return () => unsubscribe();
  }, []);

  /**
   * Función auxiliar para renderizar la descripción.
   * Divide el texto por ". " y lo formatea como párrafos <p> o
   * como una lista <ul> si el 'Lugar' es "(Experiencia Previa)".
   */
  const renderDescription = (description, lugar) => {
    const cleanedDesc = description.endsWith('.') ? description.slice(0, -1) : description;
    const points = cleanedDesc.split('. ').map(p => p.trim()).filter(p => p.length > 0);

    if (lugar === "(Experiencia Previa)") {
      return (
        <ul className="card-list">
          {points.map((point, index) => (
            <li key={index}>{point}.</li>
          ))}
        </ul>
      );
    }

    // Por defecto, renderiza como párrafos
    return points.map((point, index) => (
      <p key={index} className="card-text">
        {point}.
      </p>
    ));
  };

  return (
    <section id="experiencia" className="experience-section">
      <h2 className="section-title">
        Experiencia Profesional
      </h2>
      <div className="timeline">
        {experienceList.length > 0 ? (
          experienceList.map((exp, index) => (
            <div key={index} className="timeline-card" style={{ position: 'relative' }}>
              {/* El punto de la línea de tiempo se posiciona de forma absoluta 
                relativo a esta tarjeta.
              */}
              <span 
                className="timeline-dot" 
                style={{ 
                  position: 'absolute', 
                  top: '0.25rem',
                  left: '-3.375rem' // Ajustado para alinearse con la línea
                }}
              ></span>
              
              <span className="card-subtitle">{exp.Rol}</span>
              <h3 className="card-title">{exp.Titulo}</h3>
              <h4 className="card-company">{exp.Lugar}</h4>
              
              {/* Renderiza la descripción formateada */}
              {renderDescription(exp.Descripcion, exp.Lugar)}
            </div>
          ))
        ) : (
          <p style={{ color: '#94a3b8', paddingLeft: '2.5rem' }}>Cargando experiencia...</p>
        )}
      </div>
    </section>
  );
};

/**
 * Componente ProjectCard (Tarjeta de Proyecto)
 * Componente reutilizable que muestra la info de un solo proyecto.
 * @param {object} props
 * @param {string} props.title - Título del proyecto.
 * @param {string} props.description - Descripción del proyecto.
 * @param {string[]} props.tags - Array de tecnologías (tags).
 */
const ProjectCard = ({ title, description, tags }) => {
  return (
    <div className="project-card">
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
      <div className="project-tags">
        {tags.map((tag) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

/**
 * Componente Projects
 * Muestra una cuadrícula de proyectos destacados desde Firebase.
 * Utiliza el componente ProjectCard para cada ítem.
 */
const Projects = () => {
  const [projects, setProjects] = useState([]);

  // Efecto para cargar los proyectos desde Firebase
  useEffect(() => {
    const projectsRef = dbRef(db, 'MarquezInfo/Proyectos');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedProjects = Object.values(data);
        
        // Formatea los datos: convierte el sub-objeto 'Tecnologias' en un array
        const formattedProjects = loadedProjects.map(project => {
          const tagsArray = (project.Tecnologias && typeof project.Tecnologias === 'object') 
            ? Object.values(project.Tecnologias) 
            : [];
          return { ...project, Tecnologias: tagsArray };
        });

        setProjects(formattedProjects);
      } else {
        setProjects([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="proyectos" className="projects-section">
      <h2 className="section-title">
        Proyectos Destacados
      </h2>
      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            // Renderiza una tarjeta por cada proyecto
            <ProjectCard 
              key={index} 
              title={project.Titulo}
              description={project.Descripcion}
              tags={project.Tecnologias}
            />
          ))
        ) : (
          <p style={{ color: '#94a3b8', gridColumn: '1 / -1', textAlign: 'center' }}>
            Cargando proyectos...
          </p>
        )}
      </div>
    </section>
  );
};

/**
 * Componente Contact
 * Muestra la sección final de contacto con enlaces.
 */
const Contact = () => {
  return (
    <section id="contacto" className="contact-section">
      <div className="contact-content">
        <h2 className="section-title">
          Contacto
        </h2>
        <p className="contact-description">
          Actualmente estoy abierto a nuevas oportunidades. Si mi perfil encaja con sus necesidades, no dude en contactarme.
        </p>
        
        <div className="contact-buttons">
          {/* CORREGIDO: Se eliminaron las llaves {} sobrantes */}
          <a href="mailto:Mario.m.an@hotmail.com" className="btn btn-primary">
            Enviar Email
          </a>
          
          <a href="https://github.com/zosen1992" target="_blank" rel="noopener noreferrer" className="btn btn-secondary group">
            GitHub <ExternalLinkIcon />
          </a>
        </div>
        
        <div className="contact-info">
          <p>Nuevo León</p>
          <p>mario.m.an@hotmail.com</p>
          <p>zosen88@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

/**
 * Componente Footer
 * Muestra el pie de página del sitio.
 */
const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2026 Mario Alberto Márquez Santiago. React js.</p>
    </footer>
  );
};

/**
 * Componente Principal de la Página (Presentacion)
 * Este es el componente raíz que ensambla todas las secciones.
 * Maneja la carga de la foto de perfil y la pasa a los componentes hijos (Hero, SobreMi).
 */
export default function Presentacion() {

  // Estado para la URL de la foto de perfil, "subido" a este componente
  // para poder compartirlo con Hero y SobreMi.
  const [photoURL, setPhotoURL] = useState('');

  // Efecto para cargar la foto de perfil
  useEffect(() => {
    // 1. Obtiene la referencia 'gs://' desde la Realtime Database
    const fotoRef = dbRef(db, 'MarquezInfo/Imagenes/Fotoperfil');

    const unsubscribe = onValue(fotoRef, (snapshot) => {
      const gsUrl = snapshot.val();
      
      if (gsUrl) {
        // 2. Convierte la referencia 'gs://' en una URL de descarga 'https://'
        const imageRef = storageRef(storage, gsUrl);

        getDownloadURL(imageRef)
          .then((downloadUrl) => {
            // 3. Guarda la URL pública en el estado
            setPhotoURL(downloadUrl);
          })
          .catch((error) => {
            console.error("Error al obtener la URL de la imagen:", error);
          });
      }
    });

    // Limpieza
    return () => unsubscribe();
  }, []); // Se ejecuta solo una vez al montar

  // Renderiza la página completa
  return (
    <div className="portfolio-wrapper">
      <Header />
      
      <main className="container main-content">
        {/* Pasa la foto a los componentes que la necesitan */}
        <Hero photoURL={photoURL} />
        <SobreMi photoURL={photoURL} />

        {/* El resto de las secciones */}
        <Skills />
        <Experience />
        <Projects />
        
        {/* CORREGIDO: Se eliminaron las llaves {} sobrantes */}
        <Contact />
      </main>
      
      <Footer />
    </div>
  );

}
