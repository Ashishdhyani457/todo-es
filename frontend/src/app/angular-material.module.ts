import { NgModule } from "@angular/core";
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
    // imports:[
    //     MatCardModule,
    //     MatButtonModule,
    //     MatToolbarModule,
    //     MatExpansionModule,
    //     MatProgressBarModule,
    //     MatInputModule,
    //     MatPaginatorModule,
    //     MatDialogModule
    // ],
    exports:[
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatInputModule,
        MatPaginatorModule,
        MatDialogModule
    ]
})
export class AngularMaterialModule{}