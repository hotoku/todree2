export class Node {
  content: string;
  children: Node[];
  constructor(content: string) {
    this.content = content;
    this.children = [];
  }
}
