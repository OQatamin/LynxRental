/**
 * LynxLite Feedback System
 * Reusable feedback system for all pages
 */

// Add CSS styles for feedback system
function addFeedbackStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Floating Feedback Button */
    .floating-feedback-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #007bff, #0056b3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0, 123, 255, 0.3);
      z-index: 1000;
      transition: all 0.3s ease;
      border: none;
    }
    
    .floating-feedback-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 25px rgba(0, 123, 255, 0.4);
      color: white;
    }
    
    .feedback-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: rgba(0, 123, 255, 0.4);
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.4); opacity: 0; }
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .floating-feedback-btn {
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        font-size: 20px;
      }
    }
  `;
  document.head.appendChild(style);
}

// Create feedback modal HTML
function createFeedbackModal() {
  const modalHTML = `
    <!-- Feedback Modal -->
    <div class="modal fade" id="feedbackModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-gradient-primary text-white">
            <h5 class="modal-title">
              <i class="fas fa-comment-medical me-2"></i>Share Your Feedback
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="feedback-intro text-center mb-4">
              <i class="fas fa-users text-primary" style="font-size: 3rem;"></i>
              <h6 class="mt-2">Help Us Improve LynxLite</h6>
              <p class="text-muted">Your feedback helps us build a better rental management experience</p>
            </div>

            <form id="feedbackForm" class="needs-validation" novalidate>
              <div class="mb-3">
                <label for="feedbackName" class="form-label">
                  <i class="fas fa-user me-1"></i>Name <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control" id="feedbackName" placeholder="Your name" required>
                <div class="invalid-feedback">Please provide your name.</div>
              </div>

              <div class="mb-3">
                <label for="feedbackModule" class="form-label">
                  <i class="fas fa-puzzle-piece me-1"></i>Specific Module <span class="text-danger">*</span>
                </label>
                <select class="form-select" id="feedbackModule" required>
                  <option value="">Select Module</option>
                  <option value="Dashboard">📊 Dashboard</option>
                  <option value="Fleet Management">🚗 Fleet Management</option>
                  <option value="Booking Management">📅 Booking Management</option>
                  <option value="Customer Management">👥 Customer Management</option>
                  <option value="Billing & Payments">💳 Billing & Payments</option>
                  <option value="Telematics & Tracking">📍 Telematics & Tracking</option>
                  <option value="Reports & Analytics">📈 Reports & Analytics</option>
                  <option value="Maintenance & Compliance">🔧 Maintenance & Compliance</option>
                  <option value="Branch & Staff Management">🏢 Branch & Staff Management</option>
                  <option value="Customer Portal">👤 Customer Portal</option>
                  <option value="General System">⚙️ General System</option>
                </select>
                <div class="invalid-feedback">Please select a specific module.</div>
              </div>

              <div class="mb-3">
                <label for="feedbackComment" class="form-label">
                  <i class="fas fa-comment me-1"></i>Comment <span class="text-danger">*</span>
                </label>
                <textarea class="form-control" id="feedbackComment" rows="4" 
                          placeholder="Please share your feedback, suggestions, or report any issues..." 
                          required></textarea>
                <div class="invalid-feedback">Please provide your comment.</div>
              </div>

              <!-- Submission Status -->
              <div id="feedbackStatus" class="alert" style="display: none;"></div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between w-100 align-items-center">
              <div>
                <small class="text-muted">
                  <i class="fas fa-shield-alt me-1"></i>Your feedback is confidential and helps improve the system
                </small>
              </div>
              <div>
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">
                  <i class="fas fa-times me-1"></i>Cancel
                </button>
                <button type="button" class="btn btn-primary" onclick="submitFeedback()" id="submitFeedbackBtn">
                  <i class="fas fa-paper-plane me-1"></i>Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Create floating feedback button
function createFeedbackButton() {
  const buttonHTML = `
    <button class="floating-feedback-btn" onclick="openFeedbackModal()" title="Share Your Feedback (Ctrl+Shift+F)">
      <i class="fas fa-comment-dots"></i>
      <span class="feedback-pulse"></span>
    </button>
  `;
  
  document.body.insertAdjacentHTML('beforeend', buttonHTML);
}

// Get current page name for feedback
function getCurrentPageName() {
  const path = window.location.pathname;
  const fileName = path.split('/').pop();
  
  const pageMap = {
    'index2.html': 'Dashboard',
    'fleet-management.html': 'Fleet Management',
    'booking-management.html': 'Booking Management',
    'customer-management.html': 'Customer Management',
    'billing-payments.html': 'Billing & Payments',
    'telematics-tracking.html': 'Telematics & Tracking',
    'reports-analytics.html': 'Reports & Analytics',
    'maintenance-compliance.html': 'Maintenance & Compliance',
    'branch-staff-management.html': 'Branch & Staff Management',
    'customer-dashboard.html': 'Customer Portal',
    'customer-billing.html': 'Customer Billing',
    'customer-documents.html': 'Customer Documents',
    'customer-my-rentals.html': 'Customer Rentals',
    'customer-new-booking.html': 'Customer Booking',
    'customer-profile-settings.html': 'Customer Profile',
    'customer-rental-history.html': 'Customer History',
    'customer-support.html': 'Customer Support',
    'customer-vehicle-location.html': 'Vehicle Location'
  };
  
  return pageMap[fileName] || 'General System';
}

// Open feedback modal
function openFeedbackModal() {
  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
  modal.show();
  
  // Pre-select current page module
  const currentPage = getCurrentPageName();
  const moduleSelect = document.getElementById('feedbackModule');
  if (moduleSelect) {
    moduleSelect.value = currentPage;
  }
  
  // Focus on name field
  setTimeout(() => {
    document.getElementById('feedbackName').focus();
  }, 500);
}

// Submit feedback function
async function submitFeedback() {
  const form = document.getElementById('feedbackForm');
  const submitBtn = document.getElementById('submitFeedbackBtn');
  const statusDiv = document.getElementById('feedbackStatus');
  
  // Validate form
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }
  
  // Disable submit button and show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Submitting...';
  
  // Collect form data
  const feedbackData = {
    Name: document.getElementById('feedbackName').value,
    'Specific Module': document.getElementById('feedbackModule').value,
    Page: getCurrentPageName(),
    Comment: document.getElementById('feedbackComment').value
  };
  
  try {
    // Submit to SheetDB API
    const response = await fetch('https://sheetdb.io/api/v1/m6e9alkji637v', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbackData)
    });
    
    if (response.ok) {
      // Success
      statusDiv.className = 'alert alert-success';
      statusDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Thank you!</strong> Your feedback has been submitted successfully.
      `;
      statusDiv.style.display = 'block';
      
      // Reset form
      form.reset();
      form.classList.remove('was-validated');
      
      // Auto-close modal after 3 seconds
      setTimeout(() => {
        bootstrap.Modal.getInstance(document.getElementById('feedbackModal')).hide();
      }, 3000);
      
      // Show success notification if showNotification exists
      if (typeof showNotification === 'function') {
        showNotification('✅ Feedback submitted successfully! Thank you for helping us improve.', 'success');
      }
      
    } else {
      throw new Error('Failed to submit feedback');
    }
    
  } catch (error) {
    console.error('Feedback submission error:', error);
    
    // Show error message
    statusDiv.className = 'alert alert-danger';
    statusDiv.innerHTML = `
      <i class="fas fa-exclamation-triangle me-2"></i>
      <strong>Submission Failed</strong><br>
      Please try again or contact IT support if the problem persists.<br>
      <small class="text-muted">Error: ${error.message}</small>
    `;
    statusDiv.style.display = 'block';
  }
  
  // Re-enable submit button
  submitBtn.disabled = false;
  submitBtn.innerHTML = '<i class="fas fa-paper-plane me-1"></i>Submit Feedback';
}

// Initialize feedback system
function initializeFeedbackSystem() {
  // Add styles
  addFeedbackStyles();
  
  // Create modal and button
  createFeedbackModal();
  createFeedbackButton();
  
  // Add keyboard shortcut (Ctrl+Shift+F)
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
      e.preventDefault();
      openFeedbackModal();
    }
  });
  
  console.log('Feedback system initialized for:', getCurrentPageName());
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFeedbackSystem);
} else {
  initializeFeedbackSystem();
}
