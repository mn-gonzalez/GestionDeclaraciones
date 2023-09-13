import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox'; 
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio'; 
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select'; 
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table'; 
import { MatTreeModule } from '@angular/material/tree'; 
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog'; 
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar'; 
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner'; 
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle'; 

@NgModule({
    exports: [
      MatToolbarModule,
      MatTabsModule,
      MatIconModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatSidenavModule,
      MatListModule,
      MatStepperModule,
      MatCheckboxModule,
      MatRadioModule,
      MatSelectModule,
      MatTableModule,
      MatTreeModule,
      MatButtonModule,
      MatDialogModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatSlideToggleModule
    ]
  })
  export class MaterialModule { }