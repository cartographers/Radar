# Radar

The difficulty involved with coming up with the right query to make to get the information you want and putting it all in a nice graph is a thing of the past. Radar allows you to make queries in easy to understand format and then gives you a nice graph to showcase that information.

## Getting Started

Click this link to download and start using Radar

### Prerequisites

In order to make sure Radar works please make sure you have Postgress.app installed and running when using our application.

#### Installing Postgres

http://postgresapp.com/

1. Download -> Move to Application Folder -> Double click
2. Click initialize to create a new server
3. (Optional) Configure your $PATH to use the included line tools:

```
sudo mkdir -p /etc/paths/d &&
echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp.
```

### Installing

After you have Postgres installed you use install our app by simply double clicking on it.


## Using the App

Clicking on the app and then clicking 'Get Started' brings up a list of all the users databases. Clicking on a database name takes you to a form where you're able to form your query

### Making a query
Choose a table from the dropdown menu that appears. Additional choices for this query will also render. If the user makes no additional specifications for this query it will return back all the information from the table. 

If the user wants to grab only specific data he has the freedom to do so. In this case let us say that the user want to select the name, age, gender, sales, and id of every single user above the age of 30 and he wants the results sorted by ascending sales.
```
User chooses tables 'user'
Select, Where, Order by and Aggregates Render
User selects Name, Age, ID, Sales, Gender
User sets condition "Where age is greater than 30"
User sets condition "Order by ascending sales"
```

### Making a table

Query has been set up, now the user has 5 different visualizations to choose from, Pie, Line, Area, Bar, and Table. For Table only a name for the requested table is needed. For pie the user must choose a pie key from the selections he made. For all others he needs to specifify both an x and y axis

```
User chooses Bar Chart
Sets title as "User sales by age"
Sets x-axis as "sales"
Sets y-axis as "age"
Click make my graph
```


## Built With

* [React](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Redux](https://maven.apache.org/) - Dependency Management
* [PG](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing


## Authors

* **Dennis Bui** - *Initial work* - [DBui0051](https://github.com/DBui0051)
* **Min Hwangbo** - *Initial work* - [Mindboggling](https://github.com/Mindboggling)
* **Jagnoor Grewal** - *Initial work* - [Noorgrewal](https://github.com/Noorgrewal)
* **Sulamita Morales** - *Initial work* - [KyuSulamita](https://github.com/KyuSulamita)


## Acknowledgments

* PostgreSQL for inspiring us with their not easy to manage DBs
* Inspiration
* etc
