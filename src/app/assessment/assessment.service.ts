import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable } from 'rxjs';
import { AssessmentInputData } from './dto/AssessmentInputData';
import mondaySdk from "monday-sdk-js";
import { configuration } from '../../configuration';

@Injectable()
export class AssessmentService {

  private monday = mondaySdk() as any;

  constructor(private httpClient: HttpClient) {
  }

  public getUsersAndBoards(): Observable<AssessmentInputData> {
    return from(this.monday.api(`query { users { name } boards { id name }}`)).pipe(
      map(({ data }: any) => {
        return {
          boards: data.boards,
          users: data.users.map((user: any) => user.name),
        }
      }),
    );
  }

  public getAssessment(
    user: string,
    board: string,
    personColumnName: string,
  ): Observable<string> {
    return new Observable<string>((subscriber) => {
      from(this.monday.api(`
      query {
        items_by_column_values(
          board_id: ${board}
          column_id: "${personColumnName}"
          column_value: "${user}"
        ) {
          id
          name
          group { id title }
          column_values { id value text }
        }
      }`))
        .pipe(map((response: any) => response.data))
        .subscribe((data) => {
          this.httpClient.post<string>(`${configuration.apiHost}/gpt/get-assessment`, { user, data }).subscribe((response) => {
            subscriber.next(response);
          });
        });
    });
  }

  public async updateDocumentBody(response: string): Promise<void> {
    console.log('test');
    await this.monday.execute('addMultiBlocks', {
      blocks: [
        {
          type: 'normal text',
          content: {
            deltaFormat: [
              {
                insert: response,
              },
            ],
          },
        }],
    });
  }
}
