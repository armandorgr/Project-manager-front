// member-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Member, ProjectRole, User } from '../../model/projects/member.model';
import { MatCard } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { NgFor } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";



@Component({
selector: 'app-member-list',
standalone: true,
templateUrl: './member-list.component.html',
styleUrls: ['./member-list.component.scss'],
imports: [MatCard, MatIconModule, NgFor, MatButtonModule]
})
export class MemberListComponent {
@Input() members: Member[] = [];
@Input({required:true}) currentUserRole!:ProjectRole;
@Input({required:true}) currentUser!:User;
@Output() memberRemoved = new EventEmitter<Member>();


removeMember(member: Member) {
this.memberRemoved.emit(member);
}
}