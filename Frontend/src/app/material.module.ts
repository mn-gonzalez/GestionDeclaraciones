import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; 
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatSelectModule} from '@angular/material/select'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatTreeModule } from '@angular/material/tree'; 
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';  
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 

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
      MatSlideToggleModule,
      MatButtonToggleModule
    ]
  })
  export class MaterialModule { }