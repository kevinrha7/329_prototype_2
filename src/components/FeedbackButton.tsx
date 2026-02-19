import { useState } from 'react';
import './FeedbackButton.css';

function FeedbackButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'suggestion',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Using FormSubmit.co to send emails without backend
      const response = await fetch('https://formsubmit.co/kevindaerha@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name || 'Anonymous',
          email: formData.email || 'No email provided',
          feedbackType: formData.feedbackType,
          message: formData.message,
          _subject: `NU Resources Hub Feedback: ${formData.feedbackType}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          feedbackType: 'suggestion',
          message: ''
        });
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitStatus('idle');
  };

  return (
    <>
      <button 
        className="feedback-button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Submit feedback"
      >
        💬 Feedback
      </button>

      {isModalOpen && (
        <div className="feedback-modal-overlay" onClick={closeModal}>
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              ✕
            </button>
            
            <h2>Share Your Feedback</h2>
            <p className="modal-description">
              Help us improve the Northwestern Student Resources Hub! 
              Share suggestions, report issues, or let us know what you think.
            </p>

            {submitStatus === 'success' ? (
              <div className="success-message">
                <span className="success-icon">✓</span>
                <h3>Thank you!</h3>
                <p>Your feedback has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name (Optional)</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email (Optional)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@u.northwestern.edu"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="feedbackType">Feedback Type *</label>
                  <select
                    id="feedbackType"
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="suggestion">Suggestion</option>
                    <option value="bug">Bug/Issue Report</option>
                    <option value="resource">Missing Resource</option>
                    <option value="complaint">Complaint</option>
                    <option value="compliment">Compliment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Share your thoughts..."
                    rows={5}
                    required
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="error-message">
                    Failed to submit feedback. Please try again or email directly to kevindaerha@gmail.com
                  </div>
                )}

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={closeModal}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isSubmitting || !formData.message.trim()}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FeedbackButton;
