import { createContext, useContext, useState, ReactNode } from "react";

interface TransitionState {
  isTransitioning: boolean;
  selectedProjectId: string | null;
  cardRect: DOMRect | null;
}

interface ProjectTransitionContextType {
  transitionState: TransitionState;
  startTransition: (projectId: string, rect: DOMRect) => void;
  endTransition: () => void;
}

const ProjectTransitionContext = createContext<ProjectTransitionContextType | null>(null);

export const ProjectTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [transitionState, setTransitionState] = useState<TransitionState>({
    isTransitioning: false,
    selectedProjectId: null,
    cardRect: null,
  });

  const startTransition = (projectId: string, rect: DOMRect) => {
    setTransitionState({
      isTransitioning: true,
      selectedProjectId: projectId,
      cardRect: rect,
    });
  };

  const endTransition = () => {
    setTransitionState({
      isTransitioning: false,
      selectedProjectId: null,
      cardRect: null,
    });
  };

  return (
    <ProjectTransitionContext.Provider value={{ transitionState, startTransition, endTransition }}>
      {children}
    </ProjectTransitionContext.Provider>
  );
};

export const useProjectTransition = () => {
  const context = useContext(ProjectTransitionContext);
  if (!context) {
    throw new Error("useProjectTransition must be used within a ProjectTransitionProvider");
  }
  return context;
};
