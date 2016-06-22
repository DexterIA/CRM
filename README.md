## Customer Resource Management System ##

Track customers order history and personal data.
Provide reports to Data Warehouse System.

This is project for university subject.

## Предоставляемые ресурсы

### Общее описание

Есть две коллекции *clients* и *orders* и поскольку я использую MongoDB мне пофиг на структуру.
Имеет значение лишь формат изменения статуса заказа.

### Список ресурсов

**GET** */CRM/getClients* - список клиентов. Без параметров.<br>
**GET** */CRM/getClient?orderId={Id}* - информация о клиенте по указанному orderId.<br>
**POST** */CRM/addClient* - добавление клиента. В теле поста JSON с данными о новом клиенте.<br>
**POST** */CRM/findClient* - поиск клиентов по указанному фильтру. В теле поста фильтр JSON, пример:
Такой фильтр найдёт всех клиентов с именем Alexey в часовом поясе Москвы.
```
{
   "name": "Alexey",
  "timezone": "Europe/Moscow",
}
```
<br>
<br>
**POST** */CRM/addOrder* - добавляет заказ к списку заказов. В теле поста JSON с информацией о заказе.<br>
**POST** */CRM/findOrders* - поиск заказов по указанному фильру. В теле поста фильтр JSON, пример:
Такой фильтр выдаст все заказы у клиента №2.
```
{
    "customerId": 2
}
```
<br>
<br>
**POST** */CRM/changeOrderStatus* - меняет статус заказа. В теле поста следующая структура:
```
{
    "orderId": 12,
    "status": "Complete"
}
```