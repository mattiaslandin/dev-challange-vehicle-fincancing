import React from "react";
import './ApplicationModal.css';

export interface ApplicationModalProps {
  text: string,
  buttonText: string,
  onClick: () => void
  loadingText: string,
  isLoading: boolean,
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ text, buttonText, onClick, loadingText, isLoading }) => (
  <div className="application-modal">
    <div className="application-modal-content">
      { isLoading ? loadingContent(loadingText) : content(text, buttonText, onClick)}
    </div>
  </div>
)

const content = (text: string, buttonText: string, onClick: () => void) => (
  <>
    <p>
      { text }
    </p>
    <button onClick={ () => onClick() }>
      { buttonText }
    </button>
  </>
)

const loadingContent = (loadingText: string) => (
  <>
    <p>
      { loadingText }
    </p>
    <div className="application-modal-spinner" />
  </>
)