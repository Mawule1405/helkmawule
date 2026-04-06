import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import emailjs from '@emailjs/browser';
import {TranslatePipe} from '@ngx-translate/core';
@Component({
  selector: 'app-footer',
  imports: [
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  private readonly EMAILJS_CONFIG = {
    SERVICE_ID: 'service_zyh2y3j', // Remplacez par votre Service ID
    TEMPLATE_ID: 'template_itnvqho', // Remplacez par votre Template ID
    PUBLIC_KEY: 'iCQ38bTRrxdpPlpIn' // Remplacez par votre Public Key
  };

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  errorMessage = '';

  async onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.hideMessages();

    try {
      // Validation supplémentaire
      if (!this.validateForm()) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      // Préparation des paramètres pour MailJS
      const templateParams = {
        from_name: this.formData.name,
        from_email: this.formData.email,
        subject: this.formData.subject || 'Message depuis le portfolio',
        message: this.formData.message,
        to_name: 'Votre Nom', // Votre nom qui recevra l'email
        reply_to: this.formData.email
      };

      // Envoi de l'email via MailJS
      const response = await emailjs.send(
        this.EMAILJS_CONFIG.SERVICE_ID,
        this.EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        this.EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('Email envoyé avec succès:', response);

      // Affichage du message de succès
      this.showSuccessMessage = true;

      // Réinitialisation du formulaire
      this.resetForm();

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      this.handleError(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  private validateForm(): boolean {
    return this.formData.name.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.message.trim() !== '' &&
      this.isValidEmail(this.formData.email);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private handleError(error: any): void {
    this.showErrorMessage = true;

    if (error?.text?.includes('Quota exceeded')) {
      this.errorMessage = 'Quota d\'emails dépassé. Veuillez réessayer plus tard.';
    } else if (error?.status === 0) {
      this.errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet.';
    } else {
      this.errorMessage = 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.';
    }

    // Masquer le message d'erreur après 5 secondes
    setTimeout(() => {
      this.hideMessages();
    }, 5000);
  }

  private hideMessages(): void {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.errorMessage = '';
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  // Méthode pour fermer les messages manuellement
  closeSuccessMessage(): void {
    this.showSuccessMessage = false;
  }

  closeErrorMessage(): void {
    this.showErrorMessage = false;
  }
}
