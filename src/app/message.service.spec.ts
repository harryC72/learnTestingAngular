import { MessageService } from './message.service';
describe('MessageService', () => {
  let service: MessageService;
  beforeEach(function () {});
  it('should have no messages to start', () => {
    // arrange
    service = new MessageService();

    // act Here we act by not acting

    // assert
    expect(service.messages.length).toBe(0);
  });

  it('should add a message', () => {
    // arrange
    service = new MessageService();
    // act
    service.add('message1');
    // assert
    expect(service.messages.length).toBe(1);
  });
});
