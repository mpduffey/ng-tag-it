import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import {Autocomplete} from 'components/autocomplete/autocomplete';

@Component({
	selector:					'ng-tag-it',
	template:					`
		<ul class="ng-tag-it">
			<li *ngFor="let tag of tags; let i = index">{{tag[tagLabelField]}}<i class="fa fa-times" (click)="removeTag(i)"></i></li>
			<input [autocomplete]="autocompleteObj" #tagInput (keydown)="keypress($event, tagInput.value)" placeholder="Select tags to filter list">
		</ul>
	`,
	directives:				[Autocomplete],
	styleUrls:				['app/components/ng-tag-it/ng-tag-it.css'],
	changeDetection:	ChangeDetectionStrategy.OnPush
})

export class NgTagIt {
	@Input() autocompleteSource;
	@Input("add-tag") addTagCallback;
	@Input("remove-tag") removeTagCallback;
	@Input("initial-tags") tags;
	@Input("tag-label-field") tagLabelField = "label";
	@Output() tagAdded = new EventEmitter();

	constructor(private cd: ChangeDetectorRef) {}
	
	removeTag = function(idx) {
		this.tags.splice(idx,1);
		if (typeof this.removeTagCallback === "function") {
			this.removeTagCallback();
		} else if (this.removeTagCallback) {
			console.log("Error: remove-tag is not a function");
		}
	}
	addTag = (event, ui) => {
		this.tags.push(ui.item);
		this.cd.markForCheck();
		$(event.target).val(null);
		this.tagAdded.emit(ui.item);
		if (typeof this.addTagCallback === "function") {
			this.addTagCallback(event, ui);
		} else {
			console.log("Error: add-tag is not a function");
		}
		return false;
	}
	keypress = (event, value) => {
		if(!value && event.keyCode == 8) this.tags.pop();
	}
	ngOnInit() {
		this.autocompleteObj = {
			source:			this.autocompleteSource,
			select: 		this.addTag,
			focus:			(e, ui) => {return false;},
			delay:			500,
			minLength:	3
		}
	}
	
	/* TODOS:
	_ Add autocomplete and autocomplete source from attribute input and select function to addTag()
	_ 
	*/
}