CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -I../src

test: test_json_parser
	./test_json_parser

test_json_parser: test_json_parser.cpp ../src/JsonParser.h
	$(CXX) $(CXXFLAGS) -o $@ $<

clean:
	rm -f test_json_parser

.PHONY: test clean
