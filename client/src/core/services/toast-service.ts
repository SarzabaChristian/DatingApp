import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if(!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end';
      document.body.appendChild(container);
    console.log('toast created');
    }
  }

  private createToastElement(message: string, alertClass: 'info' | 'warning' | 'success' | 'error', duration = 5000) {
    const toastContainer = document.getElementById('toast-container');
    if(!toastContainer) {
      return;
    }

    const toast = document.createElement('div');
    toast.classList.add('alert', "alert-" + alertClass, 'shadow-lg');
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `

    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    });

    toastContainer.append(toast);
    setTimeout(() => {
      if (toastContainer.contains(toast)){
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  success(message: string, duration?: number) {
    this.createToastElement(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.createToastElement(message, 'error', duration);
  }

  info(message: string, duration?: number) {
    this.createToastElement(message, 'info', duration);
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, 'warning', duration);
  }
}
