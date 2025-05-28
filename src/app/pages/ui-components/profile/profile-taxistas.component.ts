import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-taxistas',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './profile-taxistas.component.html',
  styleUrl: './profile-taxistas.component.scss'
})
export class ProfileTaxistasComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProfileTaxistasComponent>
  ) {}

  editarPerfil() {
    console.log('Editar perfil:', this.data);
    // Aquí va la lógica para editar el perfil (abrir otro modal, navegar, etc.)
  }

  abrirConfiguracion() {
    console.log('Abrir configuración para:', this.data);
    // Aquí va la lógica para abrir configuraciones
  }

  cerrarPerfil() {
    this.dialogRef.close();
  }
}
