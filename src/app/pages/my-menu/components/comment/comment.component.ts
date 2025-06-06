import { Attribute, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment: any;

  constructor(@Attribute('text') public textFromParent: string) {}

  ngOnInit(): void {}

  addReply() {
    this.comment.replies.push({
      author: 'New Author',
      text: 'New Reply by',
      replies: [], // Allows sub-replies for the new reply.
    });
  }
}
