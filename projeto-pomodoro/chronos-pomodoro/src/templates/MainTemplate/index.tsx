// src/templates/MainTemplate/index.tsx
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Logo } from '../../components/Logo';
import { Menu } from '../../components/Menu';

type MainTemplateProps = {
  children: React.ReactNode; // Permite colocar componentes dentro da tag <MainTemplate>
};

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      {/* Todo o conteúdo que mudar por página vai cair aqui: */}
      {children}

      <Container>
        <Footer />
      </Container>
    </>
  );
}