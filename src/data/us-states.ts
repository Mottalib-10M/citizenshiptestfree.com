/**
 * The 50 states: postal code, capital and the two U.S. senators in office.
 * Senators: Congress.gov member data (Library of Congress), current Senate members, read on
 * 2026-10-27 (`SENATORS_READ`); senate.gov publishes the same list but refuses automated reading.
 * A seat changes after a resignation, a death or an appointment: re-read the list before each update.
 * Capitals: the seat of each state government (general reference facts; each state's official site is listed on USA.gov).
 * Representatives are NOT listed: they depend on the congressional district of an address, so the
 * tool sends visitors to the House's own ZIP code lookup (house.gov) instead of guessing.
 */
export type Party = 'D' | 'R' | 'I';
export interface Senator { name: string; party: Party; since: number }
export interface UsState { code: string; name: string; capital: string; senators: [Senator, Senator] }
export const SENATORS_READ = '2026-10-27';
export const STATES: UsState[] = [
  { code: 'AL', name: 'Alabama', capital: 'Montgomery', senators: [{ name: 'Katie Boyd Britt', party: 'R', since: 2023 }, { name: 'Tommy Tuberville', party: 'R', since: 2021 }] },
  { code: 'AK', name: 'Alaska', capital: 'Juneau', senators: [{ name: 'Lisa Murkowski', party: 'R', since: 2002 }, { name: 'Dan Sullivan', party: 'R', since: 2015 }] },
  { code: 'AZ', name: 'Arizona', capital: 'Phoenix', senators: [{ name: 'Ruben Gallego', party: 'D', since: 2025 }, { name: 'Mark Kelly', party: 'D', since: 2020 }] },
  { code: 'AR', name: 'Arkansas', capital: 'Little Rock', senators: [{ name: 'John Boozman', party: 'R', since: 2011 }, { name: 'Tom Cotton', party: 'R', since: 2015 }] },
  { code: 'CA', name: 'California', capital: 'Sacramento', senators: [{ name: 'Alex Padilla', party: 'D', since: 2021 }, { name: 'Adam B. Schiff', party: 'D', since: 2024 }] },
  { code: 'CO', name: 'Colorado', capital: 'Denver', senators: [{ name: 'Michael F. Bennet', party: 'D', since: 2009 }, { name: 'John W. Hickenlooper', party: 'D', since: 2021 }] },
  { code: 'CT', name: 'Connecticut', capital: 'Hartford', senators: [{ name: 'Richard Blumenthal', party: 'D', since: 2011 }, { name: 'Christopher Murphy', party: 'D', since: 2013 }] },
  { code: 'DE', name: 'Delaware', capital: 'Dover', senators: [{ name: 'Lisa Blunt Rochester', party: 'D', since: 2025 }, { name: 'Christopher A. Coons', party: 'D', since: 2010 }] },
  { code: 'FL', name: 'Florida', capital: 'Tallahassee', senators: [{ name: 'Ashley Moody', party: 'R', since: 2025 }, { name: 'Rick Scott', party: 'R', since: 2019 }] },
  { code: 'GA', name: 'Georgia', capital: 'Atlanta', senators: [{ name: 'Jon Ossoff', party: 'D', since: 2021 }, { name: 'Raphael G. Warnock', party: 'D', since: 2021 }] },
  { code: 'HI', name: 'Hawaii', capital: 'Honolulu', senators: [{ name: 'Mazie K. Hirono', party: 'D', since: 2013 }, { name: 'Brian Schatz', party: 'D', since: 2012 }] },
  { code: 'ID', name: 'Idaho', capital: 'Boise', senators: [{ name: 'Mike Crapo', party: 'R', since: 1999 }, { name: 'James E. Risch', party: 'R', since: 2009 }] },
  { code: 'IL', name: 'Illinois', capital: 'Springfield', senators: [{ name: 'Tammy Duckworth', party: 'D', since: 2017 }, { name: 'Richard J. Durbin', party: 'D', since: 1997 }] },
  { code: 'IN', name: 'Indiana', capital: 'Indianapolis', senators: [{ name: 'Jim Banks', party: 'R', since: 2025 }, { name: 'Todd Young', party: 'R', since: 2017 }] },
  { code: 'IA', name: 'Iowa', capital: 'Des Moines', senators: [{ name: 'Joni Ernst', party: 'R', since: 2015 }, { name: 'Chuck Grassley', party: 'R', since: 1981 }] },
  { code: 'KS', name: 'Kansas', capital: 'Topeka', senators: [{ name: 'Roger Marshall', party: 'R', since: 2021 }, { name: 'Jerry Moran', party: 'R', since: 2011 }] },
  { code: 'KY', name: 'Kentucky', capital: 'Frankfort', senators: [{ name: 'Mitch McConnell', party: 'R', since: 1985 }, { name: 'Rand Paul', party: 'R', since: 2011 }] },
  { code: 'LA', name: 'Louisiana', capital: 'Baton Rouge', senators: [{ name: 'Bill Cassidy', party: 'R', since: 2015 }, { name: 'John Kennedy', party: 'R', since: 2017 }] },
  { code: 'ME', name: 'Maine', capital: 'Augusta', senators: [{ name: 'Susan M. Collins', party: 'R', since: 1997 }, { name: 'Angus S. King Jr.', party: 'I', since: 2013 }] },
  { code: 'MD', name: 'Maryland', capital: 'Annapolis', senators: [{ name: 'Angela D. Alsobrooks', party: 'D', since: 2025 }, { name: 'Chris Van Hollen', party: 'D', since: 2017 }] },
  { code: 'MA', name: 'Massachusetts', capital: 'Boston', senators: [{ name: 'Edward J. Markey', party: 'D', since: 2013 }, { name: 'Elizabeth Warren', party: 'D', since: 2013 }] },
  { code: 'MI', name: 'Michigan', capital: 'Lansing', senators: [{ name: 'Gary C. Peters', party: 'D', since: 2015 }, { name: 'Elissa Slotkin', party: 'D', since: 2025 }] },
  { code: 'MN', name: 'Minnesota', capital: 'Saint Paul', senators: [{ name: 'Amy Klobuchar', party: 'D', since: 2007 }, { name: 'Tina Smith', party: 'D', since: 2018 }] },
  { code: 'MS', name: 'Mississippi', capital: 'Jackson', senators: [{ name: 'Cindy Hyde-Smith', party: 'R', since: 2018 }, { name: 'Roger F. Wicker', party: 'R', since: 2007 }] },
  { code: 'MO', name: 'Missouri', capital: 'Jefferson City', senators: [{ name: 'Josh Hawley', party: 'R', since: 2019 }, { name: 'Eric Schmitt', party: 'R', since: 2023 }] },
  { code: 'MT', name: 'Montana', capital: 'Helena', senators: [{ name: 'Steve Daines', party: 'R', since: 2015 }, { name: 'Tim Sheehy', party: 'R', since: 2025 }] },
  { code: 'NE', name: 'Nebraska', capital: 'Lincoln', senators: [{ name: 'Deb Fischer', party: 'R', since: 2013 }, { name: 'Pete Ricketts', party: 'R', since: 2023 }] },
  { code: 'NV', name: 'Nevada', capital: 'Carson City', senators: [{ name: 'Catherine Cortez Masto', party: 'D', since: 2017 }, { name: 'Jacky Rosen', party: 'D', since: 2019 }] },
  { code: 'NH', name: 'New Hampshire', capital: 'Concord', senators: [{ name: 'Margaret Wood Hassan', party: 'D', since: 2017 }, { name: 'Jeanne Shaheen', party: 'D', since: 2009 }] },
  { code: 'NJ', name: 'New Jersey', capital: 'Trenton', senators: [{ name: 'Cory A. Booker', party: 'D', since: 2013 }, { name: 'Andy Kim', party: 'D', since: 2024 }] },
  { code: 'NM', name: 'New Mexico', capital: 'Santa Fe', senators: [{ name: 'Martin Heinrich', party: 'D', since: 2013 }, { name: 'Ben Ray Luján', party: 'D', since: 2021 }] },
  { code: 'NY', name: 'New York', capital: 'Albany', senators: [{ name: 'Kirsten E. Gillibrand', party: 'D', since: 2009 }, { name: 'Charles E. Schumer', party: 'D', since: 1999 }] },
  { code: 'NC', name: 'North Carolina', capital: 'Raleigh', senators: [{ name: 'Ted Budd', party: 'R', since: 2023 }, { name: 'Thomas Tillis', party: 'R', since: 2015 }] },
  { code: 'ND', name: 'North Dakota', capital: 'Bismarck', senators: [{ name: 'Kevin Cramer', party: 'R', since: 2019 }, { name: 'John Hoeven', party: 'R', since: 2011 }] },
  { code: 'OH', name: 'Ohio', capital: 'Columbus', senators: [{ name: 'Jon Husted', party: 'R', since: 2025 }, { name: 'Bernie Moreno', party: 'R', since: 2025 }] },
  { code: 'OK', name: 'Oklahoma', capital: 'Oklahoma City', senators: [{ name: 'Alan Armstrong', party: 'R', since: 2026 }, { name: 'James Lankford', party: 'R', since: 2015 }] },
  { code: 'OR', name: 'Oregon', capital: 'Salem', senators: [{ name: 'Jeff Merkley', party: 'D', since: 2009 }, { name: 'Ron Wyden', party: 'D', since: 1996 }] },
  { code: 'PA', name: 'Pennsylvania', capital: 'Harrisburg', senators: [{ name: 'John Fetterman', party: 'D', since: 2023 }, { name: 'David McCormick', party: 'R', since: 2025 }] },
  { code: 'RI', name: 'Rhode Island', capital: 'Providence', senators: [{ name: 'Jack Reed', party: 'D', since: 1997 }, { name: 'Sheldon Whitehouse', party: 'D', since: 2007 }] },
  { code: 'SC', name: 'South Carolina', capital: 'Columbia', senators: [{ name: 'Darline Graham', party: 'R', since: 2026 }, { name: 'Tim Scott', party: 'R', since: 2013 }] },
  { code: 'SD', name: 'South Dakota', capital: 'Pierre', senators: [{ name: 'Mike Rounds', party: 'R', since: 2015 }, { name: 'John Thune', party: 'R', since: 2005 }] },
  { code: 'TN', name: 'Tennessee', capital: 'Nashville', senators: [{ name: 'Marsha Blackburn', party: 'R', since: 2019 }, { name: 'Bill Hagerty', party: 'R', since: 2021 }] },
  { code: 'TX', name: 'Texas', capital: 'Austin', senators: [{ name: 'John Cornyn', party: 'R', since: 2002 }, { name: 'Ted Cruz', party: 'R', since: 2013 }] },
  { code: 'UT', name: 'Utah', capital: 'Salt Lake City', senators: [{ name: 'John R. Curtis', party: 'R', since: 2025 }, { name: 'Mike Lee', party: 'R', since: 2011 }] },
  { code: 'VT', name: 'Vermont', capital: 'Montpelier', senators: [{ name: 'Bernard Sanders', party: 'I', since: 2007 }, { name: 'Peter Welch', party: 'D', since: 2023 }] },
  { code: 'VA', name: 'Virginia', capital: 'Richmond', senators: [{ name: 'Tim Kaine', party: 'D', since: 2013 }, { name: 'Mark R. Warner', party: 'D', since: 2009 }] },
  { code: 'WA', name: 'Washington', capital: 'Olympia', senators: [{ name: 'Maria Cantwell', party: 'D', since: 2001 }, { name: 'Patty Murray', party: 'D', since: 1993 }] },
  { code: 'WV', name: 'West Virginia', capital: 'Charleston', senators: [{ name: 'Shelley Moore Capito', party: 'R', since: 2015 }, { name: 'James C. Justice', party: 'R', since: 2025 }] },
  { code: 'WI', name: 'Wisconsin', capital: 'Madison', senators: [{ name: 'Tammy Baldwin', party: 'D', since: 2013 }, { name: 'Ron Johnson', party: 'R', since: 2011 }] },
  { code: 'WY', name: 'Wyoming', capital: 'Cheyenne', senators: [{ name: 'John Barrasso', party: 'R', since: 2007 }, { name: 'Cynthia M. Lummis', party: 'R', since: 2021 }] },
];
