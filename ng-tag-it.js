"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var autocomplete_1 = require('components/autocomplete/autocomplete');
var NgTagIt = (function () {
    function NgTagIt(cd) {
        var _this = this;
        this.cd = cd;
        this.tagLabelField = "label";
        this.tagAdded = new core_1.EventEmitter();
        this.removeTag = function (idx) {
            this.tags.splice(idx, 1);
            if (typeof this.removeTagCallback === "function") {
                this.removeTagCallback();
            }
            else if (this.removeTagCallback) {
                console.log("Error: remove-tag is not a function");
            }
        };
        this.addTag = function (event, ui) {
            _this.tags.push(ui.item);
            _this.cd.markForCheck();
            $(event.target).val(null);
            _this.tagAdded.emit(ui.item);
            if (typeof _this.addTagCallback === "function") {
                _this.addTagCallback(event, ui);
            }
            else {
                console.log("Error: add-tag is not a function");
            }
            return false;
        };
        this.keypress = function (event, value) {
            if (!value && event.keyCode == 8)
                _this.tags.pop();
        };
    }
    NgTagIt.prototype.ngOnInit = function () {
        this.autocompleteObj = {
            source: this.autocompleteSource,
            select: this.addTag,
            focus: function (e, ui) { return false; },
            delay: 500,
            minLength: 3
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NgTagIt.prototype, "autocompleteSource", void 0);
    __decorate([
        core_1.Input("add-tag"), 
        __metadata('design:type', Object)
    ], NgTagIt.prototype, "addTagCallback", void 0);
    __decorate([
        core_1.Input("remove-tag"), 
        __metadata('design:type', Object)
    ], NgTagIt.prototype, "removeTagCallback", void 0);
    __decorate([
        core_1.Input("initial-tags"), 
        __metadata('design:type', Object)
    ], NgTagIt.prototype, "tags", void 0);
    __decorate([
        core_1.Input("tag-label-field"), 
        __metadata('design:type', Object)
    ], NgTagIt.prototype, "tagLabelField", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NgTagIt.prototype, "tagAdded", void 0);
    NgTagIt = __decorate([
        core_1.Component({
            selector: 'ng-tag-it',
            template: "\n\t\t<ul class=\"ng-tag-it\">\n\t\t\t<li *ngFor=\"let tag of tags; let i = index\">{{tag[tagLabelField]}}<i class=\"fa fa-times\" (click)=\"removeTag(i)\"></i></li>\n\t\t\t<input [autocomplete]=\"autocompleteObj\" #tagInput (keydown)=\"keypress($event, tagInput.value)\" placeholder=\"Select tags to filter list\">\n\t\t</ul>\n\t",
            directives: [autocomplete_1.Autocomplete],
            styleUrls: ['app/components/ng-tag-it/ng-tag-it.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], NgTagIt);
    return NgTagIt;
}());
exports.NgTagIt = NgTagIt;
//# sourceMappingURL=ng-tag-it.js.map